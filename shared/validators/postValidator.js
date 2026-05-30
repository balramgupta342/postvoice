/**
 * Validates that a post has sufficient content
 * @param {string} post - Post text to validate
 * @param {number} minLength - Minimum character length (default: 20)
 * @returns {boolean} True if post is valid
 */
export function validatePost(post, minLength = 20) {
  return post && typeof post === 'string' && post.trim().length >= minLength;
}

/**
 * Validates topic input
 * @param {string} topic - Topic text to validate
 * @param {number} minLength - Minimum character length (default: 5)
 * @returns {boolean} True if topic is valid
 */
export function validateTopic(topic, minLength = 5) {
  return topic && typeof topic === 'string' && topic.trim().length > minLength;
}

/**
 * Validates post type ID
 * @param {string} postTypeId - Post type ID to validate
 * @param {string[]} validIds - Array of valid IDs
 * @returns {boolean} True if post type is valid
 */
export function validatePostType(postTypeId, validIds) {
  return postTypeId && validIds.includes(postTypeId);
}

/**
 * Validates prompt string
 * @param {string} prompt - Prompt text to validate
 * @param {number} minLength - Minimum character length (default: 10)
 * @returns {boolean} True if prompt is valid
 */
export function validatePrompt(prompt, minLength = 10) {
  return prompt && typeof prompt === 'string' && prompt.trim().length >= minLength;
}
