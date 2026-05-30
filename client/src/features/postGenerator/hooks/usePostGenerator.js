import { useState } from "react";
import { buildPrompt } from "../utils/buildPrompt";
import { generateWithClaude } from "../services/apiService";

/**
 * Encapsulates all post generation state and logic.
 * Keeps components clean and focused only on rendering.
 */
export function usePostGenerator() {
  const [step, setStep] = useState(1);
  const [pastPosts, setPastPosts] = useState(["", "", ""]);
  const [topic, setTopic] = useState("");
  const [postType, setPostType] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validPosts = pastPosts.filter((p) => p.trim().length > 20);

  async function generate() {
    setLoading(true);
    setError("");
    setGeneratedPost("");
    setStep(3);

    try {
      const prompt = buildPrompt(validPosts, topic, postType);
      const result = await generateWithClaude(prompt);
      setGeneratedPost(result);
      setStep(4);
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
      setStep(2);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep(1);
    setTopic("");
    setPostType("");
    setGeneratedPost("");
    setError("");
  }

  function updatePost(index, value) {
    const updated = [...pastPosts];
    updated[index] = value;
    setPastPosts(updated);
  }

  return {
    step, setStep,
    pastPosts, updatePost,
    topic, setTopic,
    postType, setPostType,
    generatedPost,
    loading,
    error,
    validPosts,
    generate,
    reset,
  };
}
