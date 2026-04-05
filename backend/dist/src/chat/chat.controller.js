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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat.service");
const accessToken_guard_1 = require("../auth/guards/accessToken.guard");
let ChatController = class ChatController {
    chatService;
    constructor(chatService) {
        this.chatService = chatService;
    }
    send(req, data) {
        return this.chatService.sendMessage(req.user['sub'], data.to, data.content);
    }
    getMessages(req, contactId) {
        return this.chatService.getMessages(req.user['sub'], contactId);
    }
    getRecent(req) {
        return this.chatService.getRecentChats(req.user['sub']);
    }
    getContacts(req) {
        return this.chatService.getAllContacts(req.user['sub']);
    }
    getUnreadCount(req) {
        return this.chatService.getUnreadCount(req.user['sub']);
    }
    markAsRead(req, senderId) {
        return this.chatService.markMessagesAsRead(req.user['sub'], senderId);
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "send", null);
__decorate([
    (0, common_1.Get)('messages/:contactId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('contactId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Get)('recent'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getRecent", null);
__decorate([
    (0, common_1.Get)('contacts'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getContacts", null);
__decorate([
    (0, common_1.Get)('unread-count'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getUnreadCount", null);
__decorate([
    (0, common_1.Post)('mark-read/:senderId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('senderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "markAsRead", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)('chat'),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map