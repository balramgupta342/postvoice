import { analyzeWritingStyle } from "./analyzeStyle";
import { POST_TYPES } from "../constants/postTypes";

/**
 * Builds a hyper-specific prompt for Claude that includes:
 * - The user's past posts as writing samples
 * - A detailed style analysis to match tone
 * - Strict anti-AI rules to ensure the output sounds human
 */
export function buildPrompt(pastPosts, topic, postTypeId) {
  const postType = POST_TYPES.find((p) => p.id === postTypeId);
  const style = analyzeWritingStyle(pastPosts);

  const styleNotes = [
    style.avgEmojisPerPost > 2
      ? `Uses emojis freely (avg ${style.avgEmojisPerPost} per post).`
      : style.avgEmojisPerPost > 0
      ? `Uses emojis sparingly (avg ${style.avgEmojisPerPost} per post).`
      : "Never uses emojis.",

    style.shortPunchyLines
      ? "Writes in short, punchy lines — one thought per line with heavy line breaks."
      : "Writes in longer, flowing paragraphs.",

    style.startsWithHook
      ? "Always opens with a strong hook line."
      : "Jumps straight into the content without a hook.",

    style.endsWithQuestion
      ? "Often ends with a question to engage their audience."
      : "Ends with a statement or call to action, not a question.",

    style.usesBullets
      ? "Occasionally uses bullet points."
      : "Avoids bullet points entirely.",

    style.isCasual
      ? "Very casual, conversational tone — almost like texting a friend."
      : "Professional but still warm and human.",

    style.usesHashtags
      ? `Uses hashtags like: ${style.commonHashtags.join(", ")}.`
      : "Does not use hashtags.",

    `Target length: ~${style.avgWordCount} words (match their average).`,
  ].join("\n");

  return `You are a ghostwriter. Your ONLY job is to write a LinkedIn post that sounds EXACTLY like this specific person — not AI, not a template, not a motivational speaker.

=== THEIR PAST POSTS (study these carefully) ===
${pastPosts.map((p, i) => `[Post ${i + 1}]\n${p}`).join("\n\n")}

=== STYLE ANALYSIS (replicate this precisely) ===
${styleNotes}

=== YOUR TASK ===
Write a "${postType?.label}" post about: "${topic}"

=== NON-NEGOTIABLE RULES ===
1. Match their EXACT tone, rhythm, and personality from the posts above.
2. Keep the length close to their average (~${style.avgWordCount} words).
3. NEVER use these AI clichés:
   - "In today's fast-paced world"
   - "I'm excited/humbled/thrilled to share"
   - "game-changer", "leverage", "delve into"
   - "It's important to...", "At the end of the day"
4. If they write casually, write casually. Mirror their imperfections if they have any.
5. ${style.shortPunchyLines ? "Use short lines with line breaks — just like they do." : "Write in their natural paragraph style."}
6. ${style.endsWithQuestion ? "End with a question, as they typically do." : "Do NOT force a question at the end."}
7. ${style.usesHashtags ? `Add relevant hashtags similar to: ${style.commonHashtags.join(", ")}` : "Do NOT add any hashtags."}
8. Output ONLY the raw post text. No intro, no explanation, no "Here's your post:". Just the post.

The ultimate test: their LinkedIn followers should not be able to tell AI wrote this.`;
}
