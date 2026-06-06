import React from 'react';
import '../styles/WritingDNADashboard.css';

export function WritingDNADashboard({ analysis }) {
  if (!analysis) {
    return null;
  }

  const {
    professionalismScore,
    storytellingScore,
    engagementScore,
    tone,
    readability,
    avgSentenceLength,
    consistencyScore,
    styleSummary,
    strengths,
    weaknesses,
  } = analysis;

  const ScoreBar = ({ label, score, color }) => (
    <div className="score-row">
      <div className="score-label">
        <span>{label}</span>
        <span className="score-value">{score}%</span>
      </div>
      <div className="score-bar">
        <div
          className={`score-fill ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="writing-dna-dashboard">
      <div className="dna-header">
        <h2>Writing DNA</h2>
        <p className="dna-summary">{styleSummary}</p>
      </div>

      {/* Classification Cards */}
      <div className="classification-cards">
        <div className="card tone-card">
          <span className="card-label">Tone</span>
          <span className="card-value">{tone}</span>
        </div>
        <div className="card readability-card">
          <span className="card-label">Readability</span>
          <span className="card-value">{readability}</span>
        </div>
        <div className="card consistency-card">
          <span className="card-label">Consistency</span>
          <span className="card-value">{consistencyScore}%</span>
        </div>
      </div>

      {/* Core Metrics */}
      <div className="metrics-section">
        <h3>Writing Metrics</h3>
        <ScoreBar label="Professionalism" score={professionalismScore} color="professional" />
        <ScoreBar label="Storytelling" score={storytellingScore} color="storytelling" />
        <ScoreBar label="Engagement" score={engagementScore} color="engagement" />
      </div>

      {/* Details Grid */}
      <div className="details-grid">
        <div className="detail-item">
          <span className="detail-label">Avg Sentence Length</span>
          <span className="detail-value">{avgSentenceLength} words</span>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="analysis-grid">
        <div className="analysis-section strengths">
          <h4>Strengths</h4>
          <ul>
            {strengths.length > 0 ? (
              strengths.map((strength, idx) => (
                <li key={idx}>
                  <span className="checkmark">✓</span> {strength}
                </li>
              ))
            ) : (
              <li className="empty">No significant strengths identified</li>
            )}
          </ul>
        </div>

        <div className="analysis-section weaknesses">
          <h4>Areas to Improve</h4>
          <ul>
            {weaknesses.length > 0 ? (
              weaknesses.map((weakness, idx) => (
                <li key={idx}>
                  <span className="cross">✗</span> {weakness}
                </li>
              ))
            ) : (
              <li className="empty">No significant weaknesses</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
