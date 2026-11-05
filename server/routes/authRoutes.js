import { Router } from "express";
import { verifyLogin } from "../auth.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required." });
    return;
  }

  const user = await verifyLogin(String(username).trim(), String(password));
  if (!user) {
    res.status(401).json({ error: "Invalid credentials." });
    return;
  }

  req.session.user = user;
  res.json({ user: { username: user.username } });
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("nrhc.sid");
    res.json({ ok: true });
  });
});

router.get("/me", (req, res) => {
  if (!req.session?.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  res.json({ user: { username: req.session.user.username } });
});

export default router;
