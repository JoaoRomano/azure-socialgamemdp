import { Router } from "express";
import { Container } from "typedi";
import config from "../../../config";
import ITestController from "../../controllers/IControllers/ITestController";

const route = Router();

export default (app: Router) => {
    app.use('/test', route);

    const ctrl = Container.get(config.controllers.test.name) as ITestController;

    route.delete('',
        (req, res, next) => ctrl.deleteAllRecords(req, res, next)
    );
}