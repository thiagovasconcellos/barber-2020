"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ensureAuth_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuth"));
var AppointmentsController_1 = __importDefault(require("../controllers/AppointmentsController"));
var appointmentsRouter = express_1.Router();
var appointmentsController = new AppointmentsController_1.default();
appointmentsRouter.use(ensureAuth_1.default);
// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });
appointmentsRouter.post('/', appointmentsController.create);
exports.default = appointmentsRouter;
