import React from 'react';
import { getMatchInterpretation } from '../utils/calculateStyleMatch';
import '../styles/StyleMatchDashboard.css';

export function StyleMatchDashboard({ styleMatch, originalAnalysis, generatedAnalysis }) {
  if (!styleMatch) {
    return null;
  }

  const {
    overallScore,
    dimensions,
    tonePreserved,
    readabilityPreserved,
    details,
  } = styleMatch;

  const interpretation = getMatchInterpretation(overallScore);
  const matchLevel = overallScore >= 85 ? 'excellent' : overallScore >= 75 ? 'strong' : overallScore >= 65 ? 'good' : 'fair';

  const DimensionScore = ({ label, score, icon }) => (
    <div className={`dimension-score score-${matchLevel}`}>
      <div className="dimension-top">
        <span className="dimension-label">{label}</span>
        <span className="dimension-percent">{Math.round(score)}%</span>
      </div>
      <div className="dimension-bar">
        <div 
          className={`dimension-fill level-${matchLevel}`}
          style={{ width: `${Math.min(score, 100)}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="style-match-dashboard">
      <div className="match-header">
        <h2>Writing DNA Match</h2>
        <p className="match-subtitle">How well your generated post matches your writing style</p>
      </div>

      {/* Overall Score - Large Display */}
      <div className={`overall-score score-${matchLevel}`}>
        <div className="score-circle">
          <div className="circle-number">{overallScore}%</div>
        </div>
        <div className="score-interpretation">
          <p className="interpretation-text">{interpretation}</p>
          <div className="match-indicators">
            <span className={`indicator ${tonePreserved ? 'preserved' : 'shifted'}`}>
              {tonePreserved ? '✓' : '✗'} Tone: {details.generatedTone}
            </span>
            <span className={`indicator ${readabilityPreserved ? 'preserved' : 'shifted'}`}>
              {readabilityPreserved ? '✓' : '✗'} Readability: {details.generatedReadability}
            </span>
          </div>
        </div>
      </div>

      {/* Dimension Breakdown */}
      <div className="dimensions-section">
        <h3>Dimension Breakdown</h3>
        <div className="dimensions-grid">
          <DimensionScore label="Professionalism" score={dimensions.professionalism} />
          <DimensionScore label="Storytelling" score={dimensions.storytelling} />
          <DimensionScore label="Engagement" score={dimensions.engagement} />
          <DimensionScore label="Readability" score={dimensions.readability} />
          <DimensionScore label="Tone Match" score={dimensions.tone} />
        </div>
      </div>

      {/* Why This Score */}
      {styleMatch.explanations && styleMatch.explanations.length > 0 && (
        <div className="explanation-section">
          <h3>Why This Score</h3>
          <div className="explanation-list">
            {styleMatch.explanations.map((exp, idx) => (
              <div key={idx} className="explanation-item">{exp}</div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Comparison */}
      <div className="comparison-section">
        <h3>Score Differences</h3>
        <div className="comparison-grid">
          <div className="comparison-item">
            <span className="comp-label">Professionalism</span>
            <span className="comp-value">
              {details.originalTone ? 
                `${styleMatch.details.professionalismDiff} points difference` :
                'N/A'
              }
            </span>
          </div>
          <div className="comparison-item">
            <span className="comp-label">Storytelling</span>
            <span className="comp-value">
              {details.originalTone ?
                `${styleMatch.details.storytellingDiff} points difference` :
                'N/A'
              }
            </span>
          </div>
          <div className="comparison-item">
            <span className="comp-label">Engagement</span>
            <span className="comp-value">
              {details.originalTone ?
                `${styleMatch.details.engagementDiff} points difference` :
                'N/A'
              }
            </span>
          </div>
          <div className="comparison-item">
            <span className="comp-label">Sentence Length</span>
            <span className="comp-value">
              {details.originalSentenceLength} → {details.generatedSentenceLength} words
            </span>
          </div>
        </div>
      </div>

      {/* Interpretation Message */}
      {overallScore >= 85 && (
        <div className="message excellent">
          <strong>Excellent Match!</strong> This generated post authentically captures your voice and style.
        </div>
      )}
      {overallScore >= 75 && overallScore < 85 && (
        <div className="message strong">
          <strong>Strong Match.</strong> The post preserves most of your writing characteristics with minor variations.
        </div>
      )}
      {overallScore >= 65 && overallScore < 75 && (
        <div className="message good">
          <strong>Good Match.</strong> Core style elements are captured. Consider regenerating if you want closer alignment.
        </div>
      )}
      {overallScore < 65 && (
        <div className="message fair">
          <strong>Fair Match.</strong> Consider regenerating to get closer to your original style.
        </div>
      )}
    </div>
  );
}
