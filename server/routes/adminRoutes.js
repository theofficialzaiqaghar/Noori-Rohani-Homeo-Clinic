import { Router } from "express";
import multer from "multer";
import { requireAuth } from "../middleware/requireAuth.js";
import { getSettings, setSettings, replaceSettings } from "../settingsStore.js";
import {
  listMedia,
  getMedia,
  saveUpload,
  patchMedia,
  removeMedia,
  getStats,
} from "../mediaStore.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
});

router.use(requireAuth);

router.get("/dashboard", (_req, res) => {
  res.json({ stats: getStats() });
});

router.get("/settings", (_req, res) => {
  res.json(getSettings());
});

router.put("/settings", (req, res) => {
  try {
    const next = setSettings(req.body || {});
    res.json(next);
  } catch (error) {
    res.status(400).json({ error: error.message || "Invalid settings" });
  }
});

router.patch("/settings", (req, res) => {
  try {
    const next = setSettings(req.body || {});
    res.json(next);
  } catch (error) {
    res.status(400).json({ error: error.message || "Invalid settings" });
  }
});

router.get("/media", (req, res) => {
  res.json(listMedia({ category: req.query.category }));
});

router.get("/media/:id", (req, res) => {
  const item = getMedia(req.params.id);
  if (!item) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(item);
});

router.post("/media/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded." });
      return;
    }
    const item = await saveUpload(req.file, {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      slot: req.body.slot || null,
      focalX: req.body.focalX ? Number(req.body.focalX) : 0.5,
      focalY: req.body.focalY ? Number(req.body.focalY) : 0.5,
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message || "Upload failed" });
  }
});

router.patch("/media/:id", (req, res) => {
  const item = patchMedia(req.params.id, req.body || {});
  if (!item) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(item);
});

router.delete("/media/:id", (req, res) => {
  const ok = removeMedia(req.params.id);
  if (!ok) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ ok: true });
});

export default router;
