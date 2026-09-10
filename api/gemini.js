export default async function handler(req, res) {
  try {
    const { prompt } = req.body || {};

    if (!prompt) {
      return res.status(400).json({
        error: "Missing prompt"
      });
    }

    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not set"
      });
    }

    const response = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
  {
        method: "POST",
        headers: {
  "Content-Type": "application/json",
  "x-goog-api-key": API_KEY
},
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error || data
      });
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const forbiddenWords = [
  "ประเทศไทย",
  "ไทย",
  "Thailand",
  "กรุงเทพ",
  "Bangkok",
  "พังงา",
  "Phang Nga",
  "ภูเก็ต",
  "Phuket",
  "จังหวัด",
  "ประเทศ",
  "อำเภอ",
  "เมือง",
  "สถานที่",
  "Location"
];

const filteredText = text
  .split(/\r?\n/)
  .map(item =>
    item
      .replace(/^[-•*\d.)]+\s*/, "")
      .trim()
  )
  .filter(item => item.length > 0)
  .filter(item =>
    !forbiddenWords.some(word =>
      item.toLowerCase().includes(word.toLowerCase())
    )
  )
  .join("\n");

    return res.status(200).json({
  text: filteredText
});

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
