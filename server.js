const express = require("express");
const path = require("path");

const app = express();

// publicフォルダを絶対パスで指定
app.use(express.static(path.join(__dirname, "public")));

// 明示的に "/" を返す（重要）
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const mangaSites = {
  "ワンピース": ["Kindle", "ピッコマ"],
  "進撃の巨人": ["DMMブックス", "Kindle"],
  "呪術廻戦": ["ジャンプ+", "Kindle"]
};

app.get("/search", (req, res) => {
  const title = req.query.title;

  const result = mangaSites[title];

  if (result) {
    res.json({ success: true, sites: result });
  } else {
    res.json({ success: false, message: "見つかりませんでした" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running!");
});