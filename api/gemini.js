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

    let response;
    let data;

    // ลองเรียก Gemini สูงสุด 3 ครั้ง
    for (let attempt = 0; attempt < 3; attempt++) {

      response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
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

      data = await response.json();

      // สำเร็จ
      if (response.ok) {
        break;
      }

      // ถ้าไม่ใช่ 503 ไม่ต้องลองซ้ำ
      if (response.status !== 503) {
        break;
      }

      // ถ้าเป็น 503 ให้รอก่อนลองใหม่
      if (attempt < 2) {
        await new Promise(resolve =>
          setTimeout(resolve, 1500 * (attempt + 1))
        );
      }
    }

    // Gemini ยังตอบ error หลังลองครบแล้ว
    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error || data
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
