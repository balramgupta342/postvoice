/**
 * Analyzes the writing style from a set of past LinkedIn posts.
 * Returns a structured style profile used to guide AI generation.
 */
export function analyzeWritingStyle(posts) {
  const combined = posts.join(" ");
  const lines = posts.flatMap((p) => p.split("\n").filter(Boolean));

  const emojiMatches = combined.match(/[\p{Emoji}]/gu) || [];
  const avgEmojisPerPost = emojiMatches.length / posts.length;

  const avgWordCount =
    posts.reduce((sum, p) => sum + p.split(/\s+/).length, 0) / posts.length;

  const shortLineRatio =
    lines.filter((l) => l.split(/\s+/).length < 8).length / (lines.length || 1);

  const casualWords = ["lol", "tbh", "ngl", "kinda", "wanna", "gonna", "y'all", "btw"];
  const hashtags = (combined.match(/#\w+/g) || []).slice(0, 5);

  return {
    avgEmojisPerPost:  parseFloat(avgEmojisPerPost.toFixed(1)),
    avgWordCount:      Math.round(avgWordCount),
    usesBullets:       posts.some((p) => /^[-•*]/m.test(p)),
    endsWithQuestion:  posts.some((p) => p.trim().endsWith("?")),
    shortPunchyLines:  shortLineRatio > 0.5,
    isCasual:          casualWords.some((w) => combined.toLowerCase().includes(w)),
    usesHashtags:      /#\w+/.test(combined),
    commonHashtags:    hashtags,
    startsWithHook:    posts.some((p) => {
      const firstLine = p.split("\n")[0];
      return firstLine.endsWith("...") || firstLine.split(/\s+/).length < 10;
    }),
  };
}
