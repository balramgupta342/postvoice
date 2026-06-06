/**
 * Sample test showing the analyzeWritingStyle output
 * from a realistic LinkedIn profile
 */
import { analyzeWritingStyle } from './analyzeStyle.js';

// Sample LinkedIn posts from a typical Tech Writer
const samplePosts = [
  `Just shipped a major refactor of our authentication system. 
   
   Lessons learned:
   • Start with the architecture, not the code
   • Always write tests before refactoring
   • Document your assumptions
   
   The biggest mistake? Assuming legacy code was correct.
   
   What's your biggest refactoring challenge? #engineering #development`,

  `Why do so many developers hate their jobs?
   
   After 8 years in tech, I've realized it's rarely about the code.
   
   It's about:
   - Unclear expectations
   - No career growth
   - Feeling undervalued
   
   I learned this the hard way at my last role.
   
   If you're hiring, remember: good engineers want meaning, not just paychecks. 💡`,

  `Today I failed spectacularly.
   
   Built an entire feature for 3 weeks. 
   Launched it.
   Users hated it.
   
   My first instinct? Defend it.
   
   Instead, I listened.
   Pivoted.
   Shipped something better.
   
   That's growth.
   
   Have you ever failed publicly? How did you recover? #learning #leadership`,

  `The most underrated skill in tech: 
   
   Reading other people's code.
   
   Think about it.
   You spend 80% of your time reading code.
   20% writing it.
   
   Yet we don't teach it.
   
   This changed my career. #bestpractices #engineering`,

  `You don't need a master's degree to be a great engineer.
   
   You need:
   - Curiosity
   - Patience
   - The ability to break down complex problems
   
   I built my career on these three things.
   
   Agree? Let me know your story. 🚀 #tech #innovation`
];

// Run the analysis
const analysis = analyzeWritingStyle(samplePosts);

console.log("=== WRITING DNA ANALYSIS ===\n");
console.log(JSON.stringify(analysis, null, 2));

console.log("\n=== INTERPRETATION ===");
console.log(`Tone: ${analysis.tone}`);
console.log(`Readability: ${analysis.readability}`);
console.log(`Style Summary: ${analysis.styleSummary}`);
console.log(`\nScores:`);
console.log(`  • Professionalism: ${analysis.professionalismScore}%`);
console.log(`  • Storytelling: ${analysis.storytellingScore}%`);
console.log(`  • Engagement: ${analysis.engagementScore}%`);
console.log(`\nKey Metrics:`);
console.log(`  • Avg Sentence Length: ${analysis.avgSentenceLength} words`);
console.log(`  • Emoji Usage: ${analysis.avgEmojisPerPost} per post`);
