import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post("/api/uppercase", (req, res) => {
  const { inputString } = req.body;
  const uppercasedString = inputString.toUpperCase();
  res.json(uppercasedString);
});

app.post("/api/sum", (req, res) => {
  const { num1, num2 } = req.body;
  const sum = num1 + num2;
  res.json(sum);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
