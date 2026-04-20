const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert ATS (Applicant Tracking System) resume analyst and career coach.
Analyze the provided resume against the job description and return a JSON response with the following structure:
{
  "score": <integer 0-100 representing ATS fit>,
  "matchedKeywords": <array of strings: keywords/skills from job description found in resume>,
  "missingKeywords": <array of strings: important keywords/skills from job description NOT in resume>,
  "improvements": <array of objects with "original", "improved", "reason" fields for bullet point rewrites>,
  "summary": <string: exactly 2 sentences assessing overall fit>
}

Scoring rubric:
- 80-100: Strong match, most key requirements met
- 60-79: Moderate match, several gaps
- 40-59: Weak match, significant gaps
- 0-39: Poor match, major misalignment

For improvements, pick 3-5 weak or generic bullet points from the resume and rewrite them to be more impactful, quantified, and ATS-friendly for the specific job.

Respond ONLY with valid JSON matching the schema above.`;

async function analyzeResume(resumeText, jobDescription) {
  const userMessage = `## Resume:\n${resumeText}\n\n## Job Description:\n${jobDescription}`;

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userMessage },
    ],
    temperature: 0.3,
    max_tokens: 2000,
  });

  const raw = response.choices[0].message.content;
  const parsed = JSON.parse(raw);

  // Validate expected fields
  if (
    typeof parsed.score !== 'number' ||
    !Array.isArray(parsed.matchedKeywords) ||
    !Array.isArray(parsed.missingKeywords) ||
    !Array.isArray(parsed.improvements) ||
    typeof parsed.summary !== 'string'
  ) {
    throw new Error('Invalid response structure from OpenAI');
  }

  return parsed;
}

module.exports = { analyzeResume };
