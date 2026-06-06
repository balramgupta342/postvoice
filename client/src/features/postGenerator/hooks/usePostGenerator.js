import { useState } from "react";
import { buildPrompt } from "../utils/buildPrompt";
import { generateWithClaude } from "../services/apiService";
import { analyzeWritingStyle } from "../utils/analyzeStyle";
import { calculateStyleMatch } from "../utils/calculateStyleMatch";

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
  const [styleAnalysis, setStyleAnalysis] = useState(null);
  const [generatedStyleAnalysis, setGeneratedStyleAnalysis] = useState(null);
  const [styleMatch, setStyleMatch] = useState(null);

  const validPosts = pastPosts.filter((p) => p.trim().length > 20);

  function analyzeStyle() {
    if (validPosts.length > 0) {
      const analysis = analyzeWritingStyle(validPosts);
      setStyleAnalysis(analysis);
      setStep(2);
    }
  }

  async function generate() {
    setLoading(true);
    setError("");
    setGeneratedPost("");
    setGeneratedStyleAnalysis(null);
    setStyleMatch(null);
    setStep(4);

    try {
      const prompt = buildPrompt(validPosts, topic, postType, styleAnalysis);
      const result = await generateWithClaude(prompt);
      setGeneratedPost(result);

      // Analyze the generated post
      const generatedAnalysis = analyzeWritingStyle([result]);
      setGeneratedStyleAnalysis(generatedAnalysis);

      // Calculate the match
      const match = calculateStyleMatch(styleAnalysis, generatedAnalysis);
      setStyleMatch(match);

      setStep(5);
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
      setStep(3);
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
    setStyleAnalysis(null);
    setGeneratedStyleAnalysis(null);
    setStyleMatch(null);
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
    styleAnalysis,
    generatedStyleAnalysis,
    styleMatch,
    analyzeStyle,
    generate,
    reset,
  };
}
