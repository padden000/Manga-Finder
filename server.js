const express = require("express");
const app = express();

app.use(express.static("public"));

const mangaSites = {
  "ワンピース": [
    "Kindle",
    "コミックシーモア",
    "ピッコマ"
  ],
  "進撃の巨人": [
    "DMMブックス",
    "Kindle"
  ],
  "呪術廻戦": [
    "ジャンプ+",
    "Kindle"
  ]
};

app.get("/search", (req, res) => {
  const title = req.query.title;

  const result = mangaSites[title];

  if (result) {
    res.json({
      success: true,
      sites: result
    });
  } else {
    res.json({
      success: false,
      message: "見つかりませんでした"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running!");
});