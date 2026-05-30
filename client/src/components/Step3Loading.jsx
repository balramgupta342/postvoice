export default function Step3Loading() {
  return (
    <div className="fade-in" style={cardStyle}>
      <div style={{ fontSize: 40, marginBottom: 16 }} className="pulse">✍️</div>
      <h2 style={heading}>Studying your voice...</h2>
      <p style={subtext}>
        Analyzing your tone, rhythm, and style.
        <br />
        Writing a post that sounds like you — not AI.
      </p>
    </div>
  );
}

const cardStyle = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-lg)",
  padding: 48,
  textAlign: "center",
  marginBottom: 16,
};

const heading = {
  fontFamily: "var(--font-display)",
  fontSize: 18,
  fontWeight: 700,
  marginBottom: 8,
};

const subtext = {
  fontSize: 13,
  color: "var(--text-muted)",
  lineHeight: 1.6,
};
