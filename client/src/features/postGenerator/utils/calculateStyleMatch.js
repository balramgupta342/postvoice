/**
 * Compares two style analyses and calculates a match score.
 * Proves that the generated post matches the user's original writing style.
 */
export function calculateStyleMatch(original, generated) {
  if (!original || !generated) {
    return null;
  }

  // Calculate differences for each dimension
  const professionalismDiff = Math.abs(
    original.professionalismScore - generated.professionalismScore
  );

  const storytellingDiff = Math.abs(
    original.storytellingScore - generated.storytellingScore
  );

  const engagementDiff = Math.abs(
    original.engagementScore - generated.engagementScore
  );

  // Sentence length diff is weighted heavier (×3) because it's a more binary trait
  const sentenceLengthDiff = Math.abs(
    original.avgSentenceLength - generated.avgSentenceLength
  );

  // Tone must match exactly
  const toneMatch = original.tone === generated.tone ? 100 : 0;

  // Readability should also match
  const readabilityMatch = original.readability === generated.readability ? 100 : 0;

  // Weighted scoring
  const overallScore = Math.max(
    0,
    (100 - professionalismDiff) * 0.25 +
      (100 - storytellingDiff) * 0.25 +
      (100 - engagementDiff) * 0.25 +
      (100 - Math.min(sentenceLengthDiff * 3, 100)) * 0.15 +
      toneMatch * 0.05 +
      readabilityMatch * 0.05
  );

  // Dimension-specific match scores (0-100)
  const dimensionMatches = {
    professionalism: Math.max(0, 100 - professionalismDiff),
    storytelling: Math.max(0, 100 - storytellingDiff),
    engagement: Math.max(0, 100 - engagementDiff),
    readability: Math.max(0, 100 - Math.min(sentenceLengthDiff * 3, 100)),
    tone: toneMatch,
  };

  // Explainability: show WHY the score is what it is
  const explanations = [];
  
  if (professionalismDiff <= 5) {
    explanations.push("✓ Professionalism perfectly preserved");
  } else if (professionalismDiff <= 15) {
    explanations.push(`✓ Professionalism very close (${original.professionalismScore} vs ${generated.professionalismScore})`);
  } else {
    explanations.push(`⚠ Professionalism shifted (${original.professionalismScore} vs ${generated.professionalismScore})`);
  }

  if (storytellingDiff <= 5) {
    explanations.push("✓ Storytelling perfectly preserved");
  } else if (storytellingDiff <= 15) {
    explanations.push(`✓ Storytelling very close (${original.storytellingScore} vs ${generated.storytellingScore})`);
  } else {
    explanations.push(`⚠ Storytelling shifted (${original.storytellingScore} vs ${generated.storytellingScore})`);
  }

  if (toneMatch === 100) {
    explanations.push(`✓ Tone preserved (${original.tone})`);
  } else {
    explanations.push(`⚠ Tone shifted (${original.tone} → ${generated.tone})`);
  }

  if (readabilityMatch === 100) {
    explanations.push(`✓ Readability preserved (${original.readability})`);
  } else {
    explanations.push(`⚠ Readability shifted (${original.readability} → ${generated.readability})`);
  }

  return {
    overallScore: Math.round(overallScore),
    dimensions: dimensionMatches,
    tonePreserved: original.tone === generated.tone,
    readabilityPreserved: original.readability === generated.readability,
    explanations,
    details: {
      originalTone: original.tone,
      generatedTone: generated.tone,
      originalReadability: original.readability,
      generatedReadability: generated.readability,
      originalSentenceLength: original.avgSentenceLength,
      generatedSentenceLength: generated.avgSentenceLength,
      professionalismDiff,
      storytellingDiff,
      engagementDiff,
      sentenceLengthDiff,
    },
  };
}

/**
 * Gets interpretive text for a match score
 */
export function getMatchInterpretation(score) {
  if (score >= 90) return "Excellent match - this sounds like you";
  if (score >= 80) return "Strong match - captures your voice";
  if (score >= 70) return "Good match - similar style";
  if (score >= 60) return "Fair match - some style elements captured";
  return "Weak match - consider regenerating";
}
