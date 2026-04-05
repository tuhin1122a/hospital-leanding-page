"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaryController = void 0;
const common_1 = require("@nestjs/common");
const salary_service_1 = require("./salary.service");
const accessToken_guard_1 = require("../auth/guards/accessToken.guard");
let SalaryController = class SalaryController {
    salaryService;
    constructor(salaryService) {
        this.salaryService = salaryService;
    }
    async getStaff(req) {
        if (req.user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Admin only');
        }
        return this.salaryService.getStaffSalaries();
    }
    async paySalary(req, data) {
        if (req.user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Admin only');
        }
        return this.salaryService.paySalary(data.userId, data.amount, data.month, data.year, data.note);
    }
    async setBase(req, data) {
        if (req.user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Admin only');
        }
        return this.salaryService.setBaseSalary(data.userId, data.amount);
    }
    async getHistory(req) {
        if (req.user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Admin only');
        }
        return this.salaryService.getAllSalaries();
    }
    async getMySalary(req) {
        return this.salaryService.getUserSalaries(req.user.sub);
    }
};
exports.SalaryController = SalaryController;
__decorate([
    (0, common_1.Get)('staff'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SalaryController.prototype, "getStaff", null);
__decorate([
    (0, common_1.Post)('pay'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SalaryController.prototype, "paySalary", null);
__decorate([
    (0, common_1.Post)('set-base'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SalaryController.prototype, "setBase", null);
__decorate([
    (0, common_1.Get)('history'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SalaryController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Get)('my'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SalaryController.prototype, "getMySalary", null);
exports.SalaryController = SalaryController = __decorate([
    (0, common_1.Controller)('salary'),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    __metadata("design:paramtypes", [salary_service_1.SalaryService])
], SalaryController);
//# sourceMappingURL=salary.controller.js.map