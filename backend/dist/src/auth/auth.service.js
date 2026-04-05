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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const speakeasy = __importStar(require("speakeasy"));
const resetOtpStore = new Map();
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signUp(data) {
        const userExists = await this.usersService.findByEmail(data.email);
        if (userExists) {
            throw new common_1.BadRequestException('User already exists');
        }
        const hashedPassword = await this.hashData(data.password);
        const newUser = await this.usersService.create({
            ...data,
            password: hashedPassword,
        });
        const tokens = await this.getTokens(newUser.id, newUser.email, newUser.role);
        await this.updateRefreshToken(newUser.id, tokens.refreshToken);
        return tokens;
    }
    async signIn(data, meta) {
        const user = await this.usersService.findByEmail(data.email);
        if (!user) {
            throw new common_1.BadRequestException('User does not exist');
        }
        const passwordMatches = await bcrypt.compare(data.password, user.password);
        if (!passwordMatches) {
            await this.usersService
                .recordLogin(user.id, { ...meta, success: false })
                .catch(() => { });
            throw new common_1.BadRequestException('Invalid credentials');
        }
        if (user.twoFactorEnabled) {
            return { requiresTwoFactor: true, userId: user.id };
        }
        await this.usersService
            .recordLogin(user.id, { ...meta, success: true })
            .catch(() => { });
        const tokens = await this.getTokens(user.id, user.email, user.role);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
    async verifyLoginTwoFactor(userId, token, meta) {
        const user = await this.usersService.findById(userId);
        if (!user || !user.twoFactorSecret) {
            throw new common_1.BadRequestException('2FA not configured');
        }
        const isValid = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token,
            window: 1,
        });
        if (!isValid) {
            await this.usersService
                .recordLogin(userId, { ...meta, success: false })
                .catch(() => { });
            throw new common_1.BadRequestException('Invalid authenticator code');
        }
        await this.usersService
            .recordLogin(userId, { ...meta, success: true })
            .catch(() => { });
        const tokens = await this.getTokens(user.id, user.email, user.role);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
    async logout(userId) {
        return this.usersService.update(userId, {
            refreshToken: null,
            lastActive: new Date(),
        });
    }
    async generateResetOtp(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user)
            throw new common_1.BadRequestException('No account found with this email');
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 10 * 60 * 1000;
        resetOtpStore.set(email, { otp, expiresAt });
        console.log(`\n====================================`);
        console.log(`  Password Reset OTP for: ${email}`);
        console.log(`  OTP: ${otp}  (expires in 10 min)`);
        console.log(`====================================\n`);
        return { message: 'OTP sent to your email' };
    }
    async verifyResetOtp(email, otp) {
        const entry = resetOtpStore.get(email);
        if (!entry)
            throw new common_1.BadRequestException('No OTP requested for this email');
        if (Date.now() > entry.expiresAt) {
            resetOtpStore.delete(email);
            throw new common_1.BadRequestException('OTP expired. Request a new one.');
        }
        if (entry.otp !== otp)
            throw new common_1.BadRequestException('Invalid OTP');
        return { message: 'OTP verified' };
    }
    async resetPassword(email, otp, newPassword) {
        await this.verifyResetOtp(email, otp);
        const user = await this.usersService.findByEmail(email);
        if (!user)
            throw new common_1.BadRequestException('User not found');
        const hashed = await this.hashData(newPassword);
        await this.usersService.update(user.id, { password: hashed });
        resetOtpStore.delete(email);
        return { message: 'Password reset successfully' };
    }
    async refreshTokens(userId, refreshToken) {
        const user = await this.usersService.findById(userId);
        if (!user || !user.refreshToken) {
            throw new common_1.ForbiddenException('Access Denied');
        }
        const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!refreshTokenMatches) {
            throw new common_1.ForbiddenException('Access Denied');
        }
        const tokens = await this.getTokens(user.id, user.email, user.role);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
    async getMe(userId) {
        const user = await this.usersService.findById(userId);
        if (!user)
            return null;
        const { password, ...rest } = user;
        return rest;
    }
    hashData(data) {
        return bcrypt.hash(data, 10);
    }
    async updateRefreshToken(userId, refreshToken) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.update(userId, {
            refreshToken: hashedRefreshToken,
        });
    }
    async getTokens(userId, email, role) {
        const jwtSecret = process.env.JWT_SECRET || 'super-secret-jwt-key-change-this';
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email,
                role,
            }, {
                secret: jwtSecret,
                expiresIn: '15m',
            }),
            this.jwtService.signAsync({
                sub: userId,
                email,
                role,
            }, {
                secret: jwtSecret,
                expiresIn: '7d',
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map