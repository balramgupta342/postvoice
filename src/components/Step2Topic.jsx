import { POST_TYPES } from "../constants/postTypes";

export default function Step2Topic({ topic, setTopic, postType, setPostType, onBack, onGenerate }) {
  const canGenerate = topic.trim().length > 5 && postType;

  return (
    <div className="fade-in">
      <div style={cardStyle}>
        <div style={stepLabel}>STEP 2 OF 3</div>
        <h2 style={heading}>What do you want to post about?</h2>

        {/* Topic input */}
        <div style={{ marginBottom: 20 }}>
          <div style={fieldLabel}>Describe your topic in one line</div>
          <input
            type="text"
            style={inputStyle}
            placeholder="e.g. I just got promoted to Senior Developer after 3 years of grinding..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        {/* Post type grid */}
        <div style={fieldLabel}>Choose a post type</div>
        <div style={gridStyle}>
          {POST_TYPES.map((pt) => (
            <div
              key={pt.id}
              onClick={() => setPostType(pt.id)}
              style={postTypeCard(postType === pt.id)}
            >
              <div style={{ fontSize: 22, marginBottom: 4 }}>{pt.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{pt.label}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{pt.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
          <button style={ghostBtn} onClick={onBack}>← Back</button>
          <button
            style={primaryBtn(canGenerate)}
            disabled={!canGenerate}
            onClick={onGenerate}
          >
            Generate My Post ✨
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
  marginBottom: 16,
};

const fieldLabel = { fontSize: 13, color: "var(--text-muted)", marginBottom: 8 };

const inputStyle = {
  width: "100%",
  background: "var(--bg-input)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-md)",
  color: "var(--text-primary)",
  fontFamily: "var(--font-body)",
  fontSize: 15,
  padding: "14px 16px",
  outline: "none",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
  marginTop: 4,
};

const postTypeCard = (selected) => ({
  background: selected ? "#141428" : "var(--bg-input)",
  border: `1.5px solid ${selected ? "var(--accent)" : "var(--border)"}`,
  borderRadius: "var(--radius-md)",
  padding: 14,
  cursor: "pointer",
  transition: "all 0.2s",
});

const ghostBtn = {
  background: "transparent",
  color: "var(--text-muted)",
  border: "1px solid var(--border-hover)",
  borderRadius: "var(--radius-sm)",
  padding: "10px 20px",
  fontSize: 14,
  cursor: "pointer",
  fontFamily: "var(--font-body)",
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
});
