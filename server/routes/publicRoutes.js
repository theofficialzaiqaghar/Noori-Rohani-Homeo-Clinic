import { Router } from "express";
import { getSettings } from "../settingsStore.js";
import { listMedia, getMedia } from "../mediaStore.js";

const router = Router();

router.get("/site", (_req, res) => {
  const settings = getSettings();
  const media = listMedia();
  const byId = Object.fromEntries(media.map((m) => [m.id, m]));
  const bySlot = Object.fromEntries(media.filter((m) => m.slot).map((m) => [m.slot, m]));

  const resolvedSlots = { ...settings.slots };
  for (const [slot, mediaId] of Object.entries(settings.slots || {})) {
    if (mediaId && byId[mediaId]) {
      resolvedSlots[slot] = byId[mediaId];
    } else if (bySlot[slot]) {
      resolvedSlots[slot] = bySlot[slot];
    } else {
      resolvedSlots[slot] = null;
    }
  }

  res.json({
    settings: {
      brand: settings.brand,
      typography: settings.typography,
      footer: settings.footer,
    },
    slots: resolvedSlots,
    media,
  });
});

router.get("/media/:id", (req, res) => {
  const item = getMedia(req.params.id);
  if (!item) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(item);
});

export default router;
