import "./styles/global.css";
import { usePostGenerator } from "./features/postGenerator/hooks/usePostGenerator";
import StepIndicator from "./features/postGenerator/components/StepIndicator";
import Step1PastPosts from "./features/postGenerator/components/Step1PastPosts";
import { WritingDNADashboard } from "./features/postGenerator/components/WritingDNADashboard";
import Step2Topic from "./features/postGenerator/components/Step2Topic";
import Step3Loading from "./features/postGenerator/components/Step3Loading";
import Step4Result from "./features/postGenerator/components/Step4Result";

export default function App() {
  const {
    step, setStep,
    pastPosts, updatePost,
    topic, setTopic,
    postType, setPostType,
    generatedPost,
    loading,
    error,
    validPosts,
    styleAnalysis,
    generatedStyleAnalysis,
    styleMatch,
    analyzeStyle,
    generate,
    reset,
  } = usePostGenerator();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", padding: "24px 16px" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>

        {/* Header */}
        <header style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={logoBox}>✍️</div>
          <div>
            <div style={logoText}>PostVoice</div>
            <div style={logoSub}>LinkedIn posts that sound like you</div>
          </div>
        </header>

        <StepIndicator currentStep={loading ? 4 : step} />

        {/* Error banner */}
        {error && (
          <div style={errorBanner}>⚠️ {error}</div>
        )}

        {/* Step routing */}
        {step === 1 && (
          <Step1PastPosts
            pastPosts={pastPosts}
            onUpdate={updatePost}
            validCount={validPosts.length}
            onNext={analyzeStyle}
          />
        )}

        {step === 2 && !loading && styleAnalysis && (
          <div className="fade-in">
            <WritingDNADashboard analysis={styleAnalysis} />
            <div style={{ display: "flex", gap: 12, marginTop: 20, justifyContent: "space-between" }}>
              <button
                style={secondaryBtn}
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
              <button
                style={primaryBtn}
                onClick={() => setStep(3)}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {step === 3 && !loading && (
          <Step2Topic
            topic={topic}       setTopic={setTopic}
            postType={postType} setPostType={setPostType}
            onBack={() => setStep(2)}
            onGenerate={generate}
          />
        )}

        {loading && <Step3Loading />}

        {step === 5 && !loading && generatedPost && (
          <Step4Result
            generatedPost={generatedPost}
            postType={postType}
            styleMatch={styleMatch}
            originalAnalysis={styleAnalysis}
            generatedAnalysis={generatedStyleAnalysis}
            onRegenerate={generate}
            onReset={reset}
          />
        )}

      </div>
    </div>
  );
}

/* ── styles ── */
const logoBox = {
  width: 40, height: 40,
  background: "linear-gradient(135deg, #4f6ef7, #7c3aed)",
  borderRadius: 10,
  display: "flex", alignItems: "center", justifyContent: "center",
  fontSize: 20,
};

const logoText = {
  fontFamily: "var(--font-display)",
  fontSize: 22,
  fontWeight: 800,
  letterSpacing: "-0.5px",
};

const logoSub = { fontSize: 12, color: "var(--text-dim)", marginTop: -2 };

const errorBanner = {
  background: "#1a0a0a",
  border: "1px solid var(--danger)",
  color: "var(--danger)",
  borderRadius: "var(--radius-md)",
  padding: 12,
  fontSize: 13,
  marginBottom: 16,
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

const secondaryBtn = {
  background: "transparent",
  color: "var(--accent)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  padding: "12px 28px",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "var(--font-body)",
  transition: "all 0.2s",
};
