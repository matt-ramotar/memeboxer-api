import express from "express";
import RealAuthService from "./api/auth/services/AuthService";
import RealStorageService from "./api/storage/services/StorageService";

const router = express.Router();

router.post("/auth/continue/google", new RealAuthService().continueWithGoogle);
router.post("/auth/token/validate", new RealAuthService().validateToken);
router.post("/storage/png", new RealStorageService().uploadPng);
router.get("/storage/:key", new RealStorageService().getSignedUrl);

export default router;
