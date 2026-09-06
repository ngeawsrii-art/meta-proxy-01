import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const { q, limit } = req.query;

    if (!q) {
      return res.status(400).json({
        error: "Missing required query parameter: q"
      });
    }

    const FB_TOKEN = process.env.FB_TOKEN;

    if (!FB_TOKEN) {
      return res.status(500).json({
        error: "FB_TOKEN is not set in environment variables"
      });
    }

    const resultLimit = limit ? parseInt(limit, 10) : 10;

    const url = `https://graph.facebook.com/v19.0/search?type=adinterest&q=${encodeURIComponent(
      q
    )}&limit=${resultLimit}&access_token=${FB_TOKEN}`;

    const fbResponse = await fetch(url);
    const data = await fbResponse.json();

    if (data.error) {
      return res.status(400).json({
        error: data.error
      });
    }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
