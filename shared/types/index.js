/**
 * @typedef {Object} PostType
 * @property {string} id - Unique identifier (achievement, story, tip, hottake, gratitude, question)
 * @property {string} emoji - Emoji representation
 * @property {string} label - Display label
 * @property {string} desc - Description
 */

/**
 * @typedef {Object} WritingStyle
 * @property {number} avgEmojisPerPost - Average emojis per post
 * @property {number} avgWordCount - Average word count
 * @property {boolean} usesBullets - Whether writer uses bullet points
 * @property {boolean} endsWithQuestion - Whether posts typically end with questions
 * @property {boolean} shortPunchyLines - Whether writer uses short lines
 * @property {boolean} isCasual - Whether writing is casual
 * @property {boolean} usesHashtags - Whether writer uses hashtags
 * @property {string[]} commonHashtags - Common hashtags used
 * @property {boolean} startsWithHook - Whether posts start with a hook
 */

/**
 * @typedef {Object} GenerateRequest
 * @property {string[]} pastPosts - Previous posts for style analysis
 * @property {string} topic - Topic to write about
 * @property {string} postTypeId - Type of post to generate
 */

/**
 * @typedef {Object} GenerateResponse
 * @property {string} result - Generated post text
 */

export {};
