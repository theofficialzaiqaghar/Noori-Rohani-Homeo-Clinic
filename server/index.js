import "dotenv/config";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import authRoutes from "./routes/authRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { ensureAdminUser } from "./auth.js";
import { uploadsRoot } from "./mediaStore.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dist = join(root, "dist");
const PORT = Number(process.env.PORT || 3001);
const isProd = process.env.NODE_ENV === "production";

await ensureAdminUser(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);

const app = express();

app.set("trust proxy", 1);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(
  session({
    name: "nrhc.sid",
    secret: process.env.SESSION_SECRET || "dev-only-insecure-secret-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: isProd,
      maxAge: 1000 * 60 * 60 * 8,
    },
  })
);

app.use("/uploads", express.static(uploadsRoot, { maxAge: isProd ? "7d" : 0 }));

app.use("/api/auth", authRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/admin", adminRoutes);

if (existsSync(dist)) {
  app.use(express.static(dist, { maxAge: isProd ? "1h" : 0, index: false }));
  app.get(/^\/(?!api|uploads).*/, (_req, res) => {
    res.sendFile(join(dist, "index.html"));
  });
} else if (!isProd) {
  console.warn("dist/ not found — run `npm run build` before using port 3001, or use Vite dev at http://localhost:5173");
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
