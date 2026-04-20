const express = require('express');
const router = express.Router();
const { analyzeResume } = require('../services/openai');

router.post('/', async (req, res) => {
  const { resumeText, jobDescription } = req.body;

  if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length < 50) {
    return res.status(400).json({
      error: 'Invalid input',
      message: 'Resume text is required and must be at least 50 characters.',
    });
  }

  if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.trim().length < 30) {
    return res.status(400).json({
      error: 'Invalid input',
      message: 'Job description is required and must be at least 30 characters.',
    });
  }

  try {
    const result = await analyzeResume(resumeText.trim(), jobDescription.trim());
    return res.json(result);
  } catch (err) {
    console.error('Analysis error:', err);

    if (err?.status === 401) {
      return res.status(500).json({
        error: 'Authentication error',
        message: 'Invalid OpenAI API key. Please check your configuration.',
      });
    }

    if (err?.status === 429) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please wait a moment and try again.',
      });
    }

    return res.status(500).json({
      error: 'Analysis failed',
      message: 'Failed to analyze resume. Please try again.',
    });
  }
});

module.exports = router;
