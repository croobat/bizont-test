import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://bizont-test-front.onrender.com"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
    const product = products[i];
    productMap.set(product, productPrices[i]);
  }

  // Compare the sold prices with the expected prices
  for (let i = 0; i < soldProducts.length; i++) {
    const soldProduct = soldProducts[i];
    const expectedPrice = productMap.get(soldProduct);
    const actualPrice = soldPrices[i];

    if (expectedPrice != actualPrice) {
      errorCount++;
    }
  }

  res.json({ errorCount });
});

app.post('/api/checkduplicateproducts', (req, res) => {
  const { productDupNames, productDupPrices, productDupWeights } = req.body;

  const seenProducts = new Set<string>();
  let duplicateCount = 0;

  console.log(productDupNames, productDupPrices, productDupWeights);

  for (let i = 0; i < productDupNames.length; i++) {
    const productKey = `${productDupNames[i]}_${productDupPrices[i]}_${productDupWeights[i]}`;

    if (seenProducts.has(productKey)) {
      duplicateCount++;
    } else {
      seenProducts.add(productKey);
    }
  }

  res.json({ duplicateCount });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app };
