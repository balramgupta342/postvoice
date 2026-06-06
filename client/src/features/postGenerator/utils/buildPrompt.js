import { POST_TYPES } from "../../../../../shared/constants/postTypes";

/**
 * Builds a hyper-specific prompt for Claude that includes:
 * - The user's past posts as writing samples
 * - A detailed style analysis to match tone
 * - Strict anti-AI rules to ensure the output sounds human
 */
export function buildPrompt(pastPosts, topic, postTypeId, styleAnalysis) {
  const postType = POST_TYPES.find((p) => p.id === postTypeId);

  // Use provided styleAnalysis or create fallback
  const style = styleAnalysis || {
    tone: "Professional",
    readability: "Medium",
    avgSentenceLength: 15,
    avgEmojisPerPost: 0.5,
    professionalismScore: 60,
    storytellingScore: 50,
    engagementScore: 50,
    styleSummary: "Professional writing style.",
    strengths: [],
    weaknesses: [],
  };

  const styleNotes = [
    `Tone: ${style.tone} — ${style.styleSummary}`,
    `Readability: ${style.readability} (avg sentence length: ${style.avgSentenceLength} words)`,
    `Emoji usage: ${style.avgEmojisPerPost > 2 ? "Frequent" : style.avgEmojisPerPost > 0.5 ? "Moderate" : "Minimal"}`,
    `Professional depth: ${style.professionalismScore > 70 ? "High" : style.professionalismScore > 50 ? "Moderate" : "Low"}`,
    `Storytelling: ${style.storytellingScore > 70 ? "Strong" : style.storytellingScore > 50 ? "Moderate" : "Minimal"}`,
    `Engagement tactics: ${style.engagementScore > 70 ? "Frequent questions & CTAs" : style.engagementScore > 50 ? "Occasional questions" : "Minimal engagement"}`,
    ...(style.strengths.length > 0 ? [`Strengths: ${style.strengths.join(", ")}`] : []),
  ].join("\n");

  return `You are a ghostwriter. Your ONLY job is to write a LinkedIn post that sounds EXACTLY like this specific person — not AI, not a template, not a motivational speaker.

=== THEIR PAST POSTS (study these carefully) ===
${pastPosts.map((p, i) => `[Post ${i + 1}]\n${p}`).join("\n\n")}

=== WRITING DNA PROFILE (replicate this precisely) ===
${styleNotes}

=== YOUR TASK ===
Write a "${postType?.label}" post about: "${topic}"

Target tone: ${style.tone}
Target readability: ${style.readability}
Target length: Match their average (approximately ${Math.round(pastPosts.reduce((sum, p) => sum + p.split(/\s+/).length, 0) / pastPosts.length)} words)

=== NON-NEGOTIABLE RULES ===
1. Your goal: Match these exact DNA scores in the generated post:
   - Professionalism: ${style.professionalismScore} (current: ~${style.professionalismScore}, target: ${Math.round(style.professionalismScore)})
   - Storytelling: ${style.storytellingScore} (current: ~${style.storytellingScore}, target: ${Math.round(style.storytellingScore)})
   - Engagement: ${style.engagementScore} (current: ~${style.engagementScore}, target: ${Math.round(style.engagementScore)})
   - Sentence Length: ${style.avgSentenceLength} words (match this exactly)

2. Match their EXACT tone, rhythm, and personality from the posts above.
3. Adopt their "${style.tone}" writing style consistently.
4. Keep sentences ${style.readability === "Easy" ? "short (8-12 words) with natural breaks" : style.readability === "Complex" ? "longer and more elaborate (18-25 words)" : "medium-length (12-18 words)"}.
5. ${style.avgEmojisPerPost > 1.5 ? "Use emojis naturally and frequently to match their style." : style.avgEmojisPerPost > 0.5 ? "Use emojis sparingly, matching their restraint." : "Avoid emojis entirely."}
6. NEVER use these AI clichés:
   - "In today's fast-paced world"
   - "I'm excited/humbled/thrilled to share"
   - "game-changer", "leverage", "delve into"
   - "It's important to...", "At the end of the day"
7. ${style.engagementScore > 60 ? "End with a question or strong call-to-action to drive engagement." : "End with a statement or reflection, not a forced question."}
8. If they use hashtags, add relevant ones. If they don't, omit them.
9. Output ONLY the raw post text. No intro, no explanation, no "Here's your post:". Just the post.

The ultimate test: the generated post should score 75%+ when re-analyzed with the same DNA engine.`;
}

