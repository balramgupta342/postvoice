import { useState } from "react";
import { POST_TYPES } from "../../../../../shared/constants/postTypes";

export default function Step4Result({ generatedPost, postType, onRegenerate, onReset }) {
  const [copied, setCopied] = useState(false);
  const postTypeObj = POST_TYPES.find((p) => p.id === postType);

  function handleCopy() {
    navigator.clipboard.writeText(generatedPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fade-in">
      {/* Post card */}
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div style={successLabel}>✓ POST READY</div>
            <h2 style={heading}>Your LinkedIn post</h2>
          </div>
          <span style={charBadge}>{generatedPost.length} chars</span>
        </div>

        {/* Tags */}
        <div style={{ marginBottom: 12 }}>
          <span style={tag}>{postTypeObj?.emoji} {postTypeObj?.label}</span>
          <span style={tag}>🎯 Your tone</span>
        </div>

        {/* Generated post */}
        <div style={postBox}>{generatedPost}</div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button style={{ ...primaryBtn, flex: 1 }} onClick={handleCopy}>
            {copied ? "✓ Copied!" : "Copy Post"}
          </button>
          <button style={ghostBtn} onClick={onRegenerate}>Regenerate</button>
          <button style={ghostBtn} onClick={onReset}>New Post</button>
        </div>
      </div>

      {/* Tip */}
      <div style={tipCard}>
        💡 <strong style={{ color: "var(--text-muted)" }}>Tip:</strong> If it doesn't sound
        like you yet, add more of your posts in Step 1 — the more samples, the better the
        voice matching.
      </div>
    </div>
  );
}

/* ── local styles ── */
const cardStyle = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-lg)",
  padding: 24,
  marginBottom: 16,
};

const successLabel = { fontSize: 13, color: "var(--success)", fontWeight: 600, marginBottom: 2 };

const heading = {
  fontFamily: "var(--font-display)",
  fontSize: 18,
  fontWeight: 700,
};

const charBadge = { fontSize: 12, color: "var(--text-muted)" };

const tag = {
  display: "inline-block",
  background: "#1a1a2e",
  color: "var(--accent)",
  borderRadius: 6,
  padding: "2px 10px",
  fontSize: 12,
  fontWeight: 500,
  marginRight: 6,
};

const postBox = {
  background: "var(--bg-input)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-md)",
  padding: 20,
  whiteSpace: "pre-wrap",
  lineHeight: 1.7,
  fontSize: 15,
  color: "#e8e6df",
  minHeight: 120,
};

const primaryBtn = {
  background: "var(--accent)",
  color: "white",
  border: "none",
  borderRadius: "var(--radius-sm)",
  padding: "12px 28px",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "var(--font-body)",
  transition: "background 0.2s",
};

const ghostBtn = {
  background: "transparent",
  color: "var(--text-muted)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  padding: "12px 28px",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "var(--font-body)",
  transition: "all 0.2s",
};

const tipCard = {
  background: "#0d1427",
  border: "1px solid #1a2f4d",
  borderRadius: "var(--radius-md)",
  padding: 16,
  fontSize: 13,
  color: "var(--text-muted)",
  lineHeight: 1.6,
};
