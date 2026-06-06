/**
 * Analyzes the writing style from a set of past LinkedIn posts.
 * Returns a structured style profile used to guide AI generation.
 */
export function analyzeWritingStyle(posts) {
  const combined = posts.join(" ");
  const combinedLower = combined.toLowerCase();
  const totalWords = combined.split(/\s+/).filter(w => w.length > 0).length;

  // ===== WORD COUNT VARIANCE =====
  const wordCounts = posts.map(p => p.split(/\s+/).filter(w => w.length > 0).length);
  const avgWordCount = wordCounts.reduce((a, b) => a + b, 0) / posts.length;
  const wordVariance = Math.sqrt(
    wordCounts.reduce((sum, count) => sum + Math.pow(count - avgWordCount, 2), 0) / posts.length
  );
  const consistencyScore = Math.max(0, 100 - (wordVariance / avgWordCount) * 100);

  // ===== EMOJI ANALYSIS =====
  const emojiMatches = combined.match(/[\p{Emoji}]/gu) || [];
  const avgEmojisPerPost = parseFloat((emojiMatches.length / posts.length).toFixed(1));

  // ===== PROFESSIONALISM SCORE =====
  const professionalWords = [
    "project", "team", "development", "engineering", "product", "design",
    "learning", "system", "architecture", "solution", "implementation",
    "strategy", "analysis", "optimization", "innovation", "leadership",
    "collaboration", "management", "technical", "professional", "best practices",
    "framework", "scalable", "performance", "quality", "robust"
  ];
  const professionalCount = professionalWords.reduce((count, word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    return count + (combined.match(regex) || []).length;
  }, 0);
  const professionalismRatio = professionalCount / Math.max(totalWords, 1);
  const professionalismScore = Math.max(25, Math.min(90, Math.round(30 + professionalismRatio * 1500)));

  // ===== STORYTELLING SCORE =====
  const storytellingWords = [
    "learned", "failed", "built", "journey", "discovered", "realized",
    "experienced", "challenge", "overcome", "breakthrough", "pivoted",
    "struggled", "achieved", "story", "happened", "remember", "transformed"
  ];
  const storytellingCount = storytellingWords.reduce((count, word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    return count + (combined.match(regex) || []).length;
  }, 0);
  const storytellingRatio = storytellingCount / Math.max(totalWords, 1);
  const storytellingScore = Math.max(25, Math.min(90, Math.round(30 + storytellingRatio * 1500)));

  // ===== ENGAGEMENT SCORE =====
  const questionCount = (combined.match(/\?/g) || []).length;
  const ctaWords = ["agree", "comment", "share", "let me know", "thoughts", "tell me", "have you"];
  const ctaCount = ctaWords.reduce((count, phrase) => {
    const regex = new RegExp(phrase, 'gi');
    return count + (combined.match(regex) || []).length;
  }, 0);
  const engagementRatio = (questionCount + ctaCount) / Math.max(posts.length, 1);
  const engagementScore = Math.max(25, Math.min(85, Math.round(30 + engagementRatio * 12)));

  // ===== SENTENCE ANALYSIS =====
  const sentenceArray = combined
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
  const avgSentenceLength = sentenceArray.length > 0 ? Math.round(totalWords / sentenceArray.length) : 0;

  // ===== PATTERN-BASED HOOK DETECTION =====
  const hookPatterns = [
    /^today i/i,
    /^why /i,
    /^how /i,
    /^the biggest/i,
    /^i learned/i,
    /^one mistake/i,
    /^unpopular opinion/i,
    /^stop /i,
    /^never /i,
    /^imagine /i
  ];
  const hasStrongHook = posts.some((p) => {
    const firstLine = p.split("\n")[0];
    return hookPatterns.some(pattern => pattern.test(firstLine));
  });

  // ===== WEIGHTED TONE CLASSIFICATION =====
  const tones = {
    Professional: professionalismScore,
    Storytelling: storytellingScore,
    Educational: engagementScore * 0.8 + professionalismScore * 0.2,
    Personal: avgEmojisPerPost * 20 + storytellingScore * 0.5,
    Engaging: engagementScore
  };
  const tone = Object.entries(tones)
    .sort((a, b) => b[1] - a[1])[0][0];

  // ===== READABILITY CLASSIFICATION =====
  let readability = "Medium";
  if (avgSentenceLength < 12) {
    readability = "Easy";
  } else if (avgSentenceLength >= 20) {
    readability = "Complex";
  }

  // ===== STRENGTHS & WEAKNESSES =====
  const strengths = [];
  const weaknesses = [];

  if (storytellingScore > 60) {
    strengths.push("Strong storytelling");
  } else if (storytellingScore < 30) {
    weaknesses.push("Limited narrative depth");
  }

  if (engagementScore > 70) {
    strengths.push("Great audience engagement");
  } else if (engagementScore < 30) {
    weaknesses.push("Low engagement triggers");
  }

  if (hasStrongHook) {
    strengths.push("Attention-grabbing hooks");
  }

  if (readability === "Easy") {
    strengths.push("Readable, accessible writing");
  } else if (readability === "Complex") {
    weaknesses.push("Dense sentence structure");
  }

  if (professionalismScore > 70) {
    strengths.push("Professional tone");
  } else if (professionalismScore < 30) {
    weaknesses.push("Limited professional depth");
  }

  if (consistencyScore > 75) {
    strengths.push("Consistent post length");
  } else if (consistencyScore < 50) {
    weaknesses.push("Inconsistent content length");
  }

  if (avgEmojisPerPost > 2) {
    strengths.push("Expressive emoji usage");
  }

  // ===== STYLE SUMMARY =====
  const summaryParts = [];

  if (tone === "Professional") {
    summaryParts.push("Writes with strong professionalism");
  } else if (tone === "Storytelling") {
    summaryParts.push("Excels at storytelling and narrative");
  } else if (tone === "Educational") {
    summaryParts.push("Focuses on educating the audience");
  } else if (tone === "Personal") {
    summaryParts.push("Takes a personal, relatable approach");
  } else if (tone === "Engaging") {
    summaryParts.push("Emphasizes audience engagement");
  }

  if (engagementScore > 60) {
    summaryParts.push("with strong engagement patterns");
  }

  if (hasStrongHook) {
    summaryParts.push("uses attention-grabbing hooks");
  }

  if (readability === "Easy") {
    summaryParts.push("maintains readable, punchy writing");
  }

  const styleSummary = summaryParts.length > 0
    ? summaryParts[0] + (summaryParts.length > 1 ? " " + summaryParts.slice(1).join(" and ") : "") + "."
    : "Balanced writing style.";

  return {
    // Core Metrics
    professionalismScore,
    professionalismRatio: parseFloat(professionalismRatio.toFixed(4)),
    storytellingScore,
    storytellingRatio: parseFloat(storytellingRatio.toFixed(4)),
    engagementScore,
    
    // Classification
    tone,
    readability,
    
    // Consistency & Detail
    avgSentenceLength,
    avgEmojisPerPost,
    consistencyScore: Math.round(consistencyScore),
    
    // Analysis Results
    styleSummary,
    strengths,
    weaknesses,
  };
}
