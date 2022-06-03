import { Router } from "express";
import { cleanController, submitController } from "./controller";

export const submit = (router: Router) =>
  router.post("/submit", submitController);

export const clean = (router: Router) =>
  router.patch("/clean", cleanController);
