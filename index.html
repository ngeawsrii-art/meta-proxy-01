<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Facebook Ad Interest Finder</title>

  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 30px 20px;
      background: #f5f7fa;
      color: #222;
    }

    h1 {
      text-align: center;
      margin-bottom: 10px;
    }

    .subtitle {
      text-align: center;
      color: #666;
      margin-bottom: 30px;
    }

    .box {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
    }

    input, select, button {
      width: 100%;
      padding: 12px;
      margin-bottom: 15px;
      box-sizing: border-box;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 16px;
    }

    button {
      background: #1877f2;
      color: white;
      border: none;
      cursor: pointer;
      font-weight: bold;
    }

    button:hover {
      background: #145db2;
    }

    .result {
      background: #f8f9fb;
      padding: 15px;
      margin-top: 12px;
      border-radius: 8px;
      border-left: 4px solid #1877f2;
    }

    .name {
      font-size: 18px;
      font-weight: bold;
    }

    .audience {
      color: #555;
      margin-top: 6px;
    }

    .error {
      color: #c00;
      margin-top: 15px;
    }

    .loading {
      text-align: center;
      margin-top: 15px;
    }
  </style>
</head>

<body>

  <h1>Facebook Ad Interest Finder</h1>
  <div class="subtitle">
    ค้นหา Facebook Ad Interests ผ่าน Facebook Graph API
  </div>

  <div class="box">

    <label for="keyword">คำค้นหา</label>
    <input
      type="text"
      id="keyword"
      placeholder="เช่น insurance, life insurance, car"
    >

    <label for="limit">จำนวนผลลัพธ์</label>
    <select id="limit">
      <option value="10">10 รายการ</option>
      <option value="20">20 รายการ</option>
      <option value="30">30 รายการ</option>
    </select>

    <button onclick="searchInterest()">
      🔎 ค้นหา Interest
    </button>

    <div id="loading" class="loading"></div>
    <div id="error" class="error"></div>
    <div id="results"></div>

  </div>

  <script>
    async function searchInterest() {

      const keyword = document.getElementById("keyword").value.trim();
      const limit = document.getElementById("limit").value;

      const resultsDiv = document.getElementById("results");
      const errorDiv = document.getElementById("error");
      const loadingDiv = document.getElementById("loading");

      resultsDiv.innerHTML = "";
      errorDiv.innerHTML = "";

      if (!keyword) {
        errorDiv.innerText = "กรุณาใส่คำค้นหา";
        return;
      }

      loadingDiv.innerText = "กำลังค้นหา...";

      try {

        const url =
          `/meta-interest?q=${encodeURIComponent(keyword)}&limit=${limit}`;

        const response = await fetch(url);
        const data = await response.json();

        loadingDiv.innerText = "";

        if (data.error) {
          errorDiv.innerText =
            "เกิดข้อผิดพลาด: " + JSON.stringify(data.error);
          return;
        }

        if (!data.data || data.data.length === 0) {
          resultsDiv.innerHTML =
            "<p>ไม่พบ Interest ที่ค้นหา</p>";
          return;
        }

        data.data.forEach(item => {

          const name = item.name || "ไม่ระบุชื่อ";

          const lower = item.audience_size_lower_bound;
          const upper = item.audience_size_upper_bound;

          let audience = "ไม่ทราบขนาดกลุ่มเป้าหมาย";

          if (lower && upper) {
            audience =
              `👥 ${lower.toLocaleString()} – ${upper.toLocaleString()} คน`;
          }

          const div = document.createElement("div");
          div.className = "result";

          div.innerHTML = `
            <div class="name">${name}</div>
            <div class="audience">${audience}</div>
          `;

          resultsDiv.appendChild(div);

        });

      } catch (error) {

        loadingDiv.innerText = "";

        errorDiv.innerText =
          "ไม่สามารถเชื่อมต่อ API ได้: " + error.message;

      }

    }
  </script>

</body>
</html>
