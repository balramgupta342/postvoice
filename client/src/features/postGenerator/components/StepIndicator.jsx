const STEP_LABELS = {
  1: "Your past posts",
  2: "Writing DNA",
  3: "What to post about",
  4: "Generating...",
  5: "Your post is ready",
};

const TOTAL_STEPS = 5;

export default function StepIndicator({ currentStep }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
      {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => {
        const isActive = s === currentStep;
        const isDone = s < currentStep;
        return (
          <div
            key={s}
            style={{
              height: 8,
              width: isActive ? 24 : 8,
              borderRadius: isActive ? 4 : "50%",
              background: isDone
                ? "var(--success)"
                : isActive
                ? "var(--accent)"
                : "var(--border)",
              transition: "all 0.3s ease",
            }}
          />
        );
      })}
      <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: 4 }}>
        {STEP_LABELS[currentStep]}
      </span>
    </div>
  );
}
