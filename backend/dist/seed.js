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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const hashPassword = async (pass) => bcrypt.hash(pass, 10);
    const pw = await hashPassword('demo123');
    await prisma.user.upsert({
        where: { email: 'admin@nurjahan.com' },
        update: { password: pw, role: 'ADMIN', name: 'Admin User' },
        create: { email: 'admin@nurjahan.com', password: pw, role: 'ADMIN', name: 'Admin User' },
    });
    await prisma.user.upsert({
        where: { email: 'doctor@nurjahan.com' },
        update: { password: pw, role: 'DOCTOR', name: 'Dr. Jane Smith' },
        create: { email: 'doctor@nurjahan.com', password: pw, role: 'DOCTOR', name: 'Dr. Jane Smith' },
    });
    await prisma.user.upsert({
        where: { email: 'receptionist@nurjahan.com' },
        update: { password: pw, role: 'RECEPTIONIST', name: 'Recp. Bob' },
        create: { email: 'receptionist@nurjahan.com', password: pw, role: 'RECEPTIONIST', name: 'Recp. Bob' },
    });
    console.log("Seeding completed!");
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map