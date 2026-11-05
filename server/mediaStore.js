import { randomUUID } from "node:crypto";
import { join, extname } from "node:path";
import { mkdirSync, unlinkSync, existsSync } from "node:fs";
import sharp from "sharp";
import { store } from "./store.js";

const uploadsRoot = join(process.cwd(), "uploads");

mkdirSync(uploadsRoot, { recursive: true });

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/avif"]);
const MAX_BYTES = 8 * 1024 * 1024;

function rows() {
  return store.getState().media;
}

function getRowById(id) {
  return rows().find((r) => r.id === id) || null;
}

function getRowBySlot(slot) {
  if (!slot) return null;
  return rows().find((r) => r.slot === slot) || null;
}

export function mediaToPublic(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    slot: row.slot,
    url: `/uploads/${row.filename}`,
    webpUrl: row.filename.endsWith(".webp")
      ? `/uploads/${row.filename}`
      : `/uploads/${row.filename.replace(/\.[^.]+$/, "")}.webp`,
    mimeType: row.mime_type,
    width: row.width,
    height: row.height,
    focalX: row.focal_x,
    focalY: row.focal_y,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function listMedia({ category } = {}) {
  const list = [...rows()].sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""));
  const filtered = category ? list.filter((r) => r.category === category) : list;
  return filtered.map(mediaToPublic);
}

export function getMedia(id) {
  return mediaToPublic(getRowById(id));
}

function clearSlotOnOther(existingId, slot) {
  if (!slot) return;
  for (const row of rows()) {
    if (row.slot === slot && row.id !== existingId) {
      row.slot = null;
      row.updated_at = new Date().toISOString();
    }
  }
}

export async function saveUpload(file, meta = {}) {
  if (!ALLOWED.has(file.mimetype)) {
    throw new Error("Unsupported file type. Use JPEG, PNG, WebP, AVIF, or SVG.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("File too large. Maximum size is 8MB.");
  }

  const id = randomUUID();
  const ext = extname(file.originalname || "").toLowerCase() || ".jpg";
  const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg"].includes(ext) ? ext : ".jpg";
  const baseName = `${id}${safeExt === ".jpeg" ? ".jpg" : safeExt}`;
  const diskPath = join(uploadsRoot, baseName);

  let width = null;
  let height = null;

  if (file.mimetype === "image/svg+xml") {
    const { writeFileSync } = await import("node:fs");
    writeFileSync(diskPath, file.buffer);
  } else {
    const image = sharp(file.buffer, { failOn: "none" });
    const info = await image.metadata();
    width = info.width ?? null;
    height = info.height ?? null;
    await image.rotate().resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true }).toFile(diskPath);

    if (safeExt !== ".webp" && file.mimetype !== "image/avif") {
      await sharp(file.buffer)
        .rotate()
        .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(join(uploadsRoot, `${id}.webp`));
    }
  }

  const now = new Date().toISOString();
  const record = {
    id,
    name: meta.name || file.originalname || "Uploaded image",
    description: meta.description || "",
    category: meta.category || "general",
    slot: meta.slot || null,
    filename: baseName,
    mime_type: file.mimetype,
    size_bytes: file.size,
    width,
    height,
    focal_x: meta.focalX ?? 0.5,
    focal_y: meta.focalY ?? 0.5,
    created_at: now,
    updated_at: now,
  };

  if (record.slot) clearSlotOnOther(id, record.slot);

  rows().push(record);
  store.save();
  return getMedia(id);
}

export function patchMedia(id, patch) {
  const row = getRowById(id);
  if (!row) return null;

  if (patch.slot && patch.slot !== row.slot) {
    clearSlotOnOther(id, patch.slot);
  }

  if (patch.name !== undefined) row.name = patch.name;
  if (patch.description !== undefined) row.description = patch.description;
  if (patch.category !== undefined) row.category = patch.category;
  if (patch.slot !== undefined) row.slot = patch.slot || null;
  if (patch.focalX !== undefined) row.focal_x = patch.focalX;
  if (patch.focalY !== undefined) row.focal_y = patch.focalY;
  row.updated_at = new Date().toISOString();

  store.save();
  return getMedia(id);
}

export function removeMedia(id) {
  const row = getRowById(id);
  if (!row) return false;
  const state = store.getState();
  state.media = state.media.filter((m) => m.id !== id);
  store.save();
  const disk = join(uploadsRoot, row.filename);
  if (existsSync(disk)) unlinkSync(disk);
  const webp = join(uploadsRoot, `${row.id}.webp`);
  if (existsSync(webp)) unlinkSync(webp);
  return true;
}

export function getStats() {
  return { mediaCount: rows().length };
}

export { uploadsRoot };
