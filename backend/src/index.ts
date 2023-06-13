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

app.post('/api/pricecheck', (req, res) => {
  const { products, productPrices, soldProducts, soldPrices } = req.body;

  const productMap = new Map<string, number>();
  let errorCount = 0;

  // Create a map of products and their expected prices
  for (let i = 0; i < products.length; i++) {
    const product = products[i].replace(/\s/g, "");
    productMap.set(product, productPrices[i]);
  }

  // Compare the sold prices with the expected prices
  for (let i = 0; i < soldProducts.length; i++) {
    const soldProduct = soldProducts[i].replace(/\s/g, "");
    const expectedPrice = productMap.get(soldProduct);
    const actualPrice = soldPrices[i];

    if (expectedPrice != actualPrice) {
      errorCount++;
    }
  }

  res.json({ errorCount });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
