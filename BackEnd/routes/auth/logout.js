import { Router } from "express";
import { login } from "../../controllers/auth/logout.js";

const routerLogout = Router();

routerLogout.post("/logout", logout);

export default routerLogout;
