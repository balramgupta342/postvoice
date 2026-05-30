export default function Step1PastPosts({ pastPosts, onUpdate, onNext, validCount }) {
  const canProceed = validCount >= 2;

  return (
    <div className="fade-in">
      <div style={cardStyle}>
        <div style={stepLabel}>STEP 1 OF 3</div>
        <h2 style={heading}>Paste your past LinkedIn posts</h2>
        <p style={subtext}>
          Add 2–3 posts you've written before. The AI will study your tone, style, and
          personality — not the topic.
        </p>

        {pastPosts.map((post, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <div style={fieldLabel}>
              Post {i + 1}{" "}
              {i < 2
                ? <span style={{ color: "var(--danger)" }}>*</span>
                : <span style={{ color: "var(--text-dim)" }}>(optional)</span>}
            </div>
            <textarea
              rows={4}
              style={textareaStyle}
              placeholder={
                i === 0
                  ? "Paste your first LinkedIn post here..."
                  : i === 1
                  ? "Paste another post — more variety = better results..."
                  : "One more? Optional but helps a lot..."
              }
              value={post}
              onChange={(e) => onUpdate(i, e.target.value)}
            />
          </div>
        ))}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
          <span style={{ fontSize: 12, color: canProceed ? "var(--success)" : "var(--text-muted)" }}>
            {validCount}/2 required posts added
          </span>
          <button style={primaryBtn(canProceed)} disabled={!canProceed} onClick={onNext}>
            Continue →
          </button>
        </div>
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

const stepLabel = { fontSize: 13, color: "var(--accent)", fontWeight: 600, marginBottom: 4 };

const heading = {
  fontFamily: "var(--font-display)",
  fontSize: 20,
  fontWeight: 700,
  marginBottom: 6,
};

const subtext = { fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 20 };

const fieldLabel = { fontSize: 12, color: "var(--text-muted)", fontWeight: 500, marginBottom: 6 };

const textareaStyle = {
  width: "100%",
  background: "var(--bg-input)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-md)",
  color: "var(--text-primary)",
  fontFamily: "var(--font-body)",
  fontSize: 14,
  padding: 14,
  resize: "vertical",
  outline: "none",
  lineHeight: 1.6,
};

const primaryBtn = (enabled) => ({
  background: enabled ? "var(--accent)" : "var(--border)",
  color: enabled ? "white" : "var(--text-dim)",
  border: "none",
  borderRadius: "var(--radius-sm)",
  padding: "12px 28px",
  fontSize: 15,
  fontWeight: 600,
  cursor: enabled ? "pointer" : "not-allowed",
  fontFamily: "var(--font-body)",
  transition: "background 0.2s",
});
