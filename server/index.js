import "dotenv/config";
import app from "./src/app.js";

const PORT = process.env.PORT || 3001;

// ── Start Server ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ PostVoice server running on http://localhost:${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || "development"}`);
});
