"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const cloudinary_1 = require("cloudinary");
const streamifier = __importStar(require("streamifier"));
const bcrypt = __importStar(require("bcrypt"));
const speakeasy = __importStar(require("speakeasy"));
const QRCode = __importStar(require("qrcode"));
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
    async uploadProfilePic(userId, file) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({ folder: 'nurjahan_profiles' }, async (error, result) => {
                if (error || !result)
                    return reject(error || new Error('Upload failed'));
                const user = await this.update(userId, {
                    profilePic: result.secure_url,
                });
                resolve(user);
            });
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
    }
    async changePassword(userId, currentPassword, newPassword) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.BadRequestException('User not found');
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch)
            throw new common_1.BadRequestException('Current password is incorrect');
        const hashed = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { id: userId },
            data: { password: hashed },
        });
        return { message: 'Password updated successfully' };
    }
    async generate2FASecret(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.BadRequestException('User not found');
        const secret = speakeasy.generateSecret({
            name: `Nurjahan Hospital (${user.email})`,
            issuer: 'Nurjahan Hospital',
        });
        await this.prisma.user.update({
            where: { id: userId },
            data: { twoFactorSecret: secret.base32 },
        });
        const qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url);
        return { secret: secret.base32, qrCode: qrCodeDataUrl };
    }
    async verify2FA(userId, token) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user || !user.twoFactorSecret)
            throw new common_1.BadRequestException('2FA not set up');
        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token,
            window: 1,
        });
        if (!verified)
            throw new common_1.BadRequestException('Invalid 2FA code');
        await this.prisma.user.update({
            where: { id: userId },
            data: { twoFactorEnabled: true },
        });
        return { message: '2FA enabled successfully' };
    }
    async disable2FA(userId) {
        await this.prisma.user.update({
            where: { id: userId },
            data: { twoFactorEnabled: false, twoFactorSecret: null },
        });
        return { message: '2FA disabled' };
    }
    async getLoginHistory(userId) {
        return this.prisma.loginHistory.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 20,
        });
    }
    async recordLogin(userId, meta) {
        const ua = meta.userAgent || '';
        const isMobile = /mobile|android|iphone|ipad/i.test(ua);
        const browser = /chrome/i.test(ua)
            ? 'Chrome'
            : /firefox/i.test(ua)
                ? 'Firefox'
                : /safari/i.test(ua)
                    ? 'Safari'
                    : /edge/i.test(ua)
                        ? 'Edge'
                        : 'Unknown';
        const os = /windows/i.test(ua)
            ? 'Windows'
            : /android/i.test(ua)
                ? 'Android'
                : /iphone|ipad/i.test(ua)
                    ? 'iOS'
                    : /mac/i.test(ua)
                        ? 'macOS'
                        : /linux/i.test(ua)
                            ? 'Linux'
                            : 'Unknown';
        return this.prisma.loginHistory.create({
            data: {
                userId,
                ip: meta.ip || 'Unknown',
                userAgent: ua,
                device: isMobile ? 'Mobile' : 'Desktop',
                browser,
                os,
                success: meta.success ?? true,
            },
        });
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    async findById(id) {
        return this.prisma.user.findUnique({ where: { id } });
    }
    async create(data) {
        return this.prisma.user.create({ data });
    }
    async update(id, data) {
        return this.prisma.user.update({ where: { id }, data });
    }
    async getAllUsers() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                permissions: true,
                profilePic: true,
                twoFactorEnabled: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async createUser(data) {
        const userExists = await this.findByEmail(data.email);
        if (userExists)
            throw new common_1.BadRequestException('User already exists');
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: data.role.toUpperCase(),
                permissions: data.permissions || ['READ'],
            },
        });
    }
    async updatePermissions(id, permissions) {
        return this.prisma.user.update({
            where: { id },
            data: { permissions },
        });
    }
    async deleteUser(id) {
        return this.prisma.user.delete({ where: { id } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map