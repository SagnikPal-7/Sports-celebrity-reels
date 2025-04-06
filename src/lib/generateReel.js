/* eslint-disable @typescript-eslint/no-unused-vars */
import OpenAI from "openai";
// import AWS from "aws-sdk";

const openai = new OpenAI(process.env.OPENAI_API_KEY);
//const polly = new AWS.Polly({ region: "us-east-1" });

export async function generateCelebrityReel(celebrityName) {
  // 1. Generate script with GPT
  const script = await generateScript(celebrityName);

  // 2. Convert to speech with Polly
  const audioUrl = await generateAudio(script);

  // 3. Compile images/video clips
  const mediaAssets = await gatherMediaAssets(celebrityName);

  // 4. Compose final video (simplified - would use RunwayML/FFmpeg in production)
  const videoUrl = await composeVideo(mediaAssets, audioUrl);

  return {
    script,
    audioUrl,
    videoUrl,
    celebrity: celebrityName,
    createdAt: new Date().toISOString(),
  };
}

async function generateScript(name) {
  const prompt = `Write a 150-word engaging historical summary of ${name}'s sports career in a style suitable for a short video reel. Highlight key achievements and memorable moments.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 300,
  });

  return response.choices[0].message.content;
}

// ... other helper functions for audio/media generation
