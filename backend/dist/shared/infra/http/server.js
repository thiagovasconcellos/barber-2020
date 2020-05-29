"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("@shared/container");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
require("express-async-errors");
var upload_1 = __importDefault(require("@config/upload"));
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var routes_1 = __importDefault(require("./routes"));
require("@shared/infra/typeorm");
var app = express_1.default();
app.use(cors_1.default({
    origin: 'http://localhost:3000',
}));
app.use(express_1.default.json());
app.use('/files', express_1.default.static(upload_1.default.directory));
app.use(routes_1.default);
app.use(function (err, request, response, _) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: 'err.message',
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
app.listen(3333, function () {
    // eslint-disable-next-line no-console
    console.log('🖥  🏃 on 🚪 3333');
});
