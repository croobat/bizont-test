import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post("/api/countwords", (req, res) => {
  const { sentence } = req.body;
  let count = 0;
  const words = sentence.replace(/[.,?!]/g, '').split(/\s+/);

  for (const word of words) {
    if (/^[a-zA-Z]+(-[a-zA-Z]+)*$/.test(word)) {
      count++;
    }
  }

  res.json(count);
});

app.post("/api/sum", (req, res) => {
  const { num1, num2 } = req.body;
  const sum = num1 + num2;
  res.json(sum);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
