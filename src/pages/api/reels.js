import { generateCelebrityReel } from "../../lib/generateReel";
// import { uploadToS3, getS3Url } from "../../lib/s3Client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Fetch existing reels (would connect to DB in production)
    return res.status(200).json({ reels: [] });
  }

  if (req.method === "POST") {
    try {
      const { celebrity } = req.body;

      if (!celebrity) {
        return res.status(400).json({ error: "Celebrity name is required" });
      }

      // Generate new reel
      const reel = await generateCelebrityReel(celebrity);

      // Store metadata in database (mock for this example)
      // In production, would use DynamoDB or similar

      return res.status(201).json({ reel });
    } catch (error) {
      console.error("Error generating reel:", error);
      return res.status(500).json({ error: "Failed to generate reel" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
