import React, { useState } from "react";
import axios from "axios";

import Card from './components/Card';

import './normalize.css';
import './App.css';

const CardGrid: React.FC = () => {
  const [sentence, setSentence] = useState("");
  const [wordsInSentence, setWordsInSentence] = useState(0);

  const [products, setProducts] = useState("");
  const [productPrices, setProductPrices] = useState("");
  const [soldProducts, setSoldProducts] = useState("");
  const [soldPrices, setSoldPrices] = useState("");
  const [priceCheckResult, setPriceCheckResult] = useState({ errorCount: 0 });

  const [productDupNames, setProductDupNames] = useState("");
  const [productDupPrices, setProductDupPrices] = useState("");
  const [productDupWeights, setProductDupWeights] = useState("");
  const [duplicateproductDupCount, setDuplicateProductDupCount] = useState(null);

  const handleStringSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/countwords", { sentence: sentence });
      setWordsInSentence(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePriceCheckSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/pricecheck", {
        products: products.split(","),
        productPrices: productPrices.split(","),
        soldProducts: soldProducts.split(","),
        soldPrices: soldPrices.split(",").map(Number),
      });
      setPriceCheckResult(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDuplicateProductsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/checkduplicateproducts", {
        productDupWeights: productDupNames.split(","),
        productDupPrices: productDupPrices.split(","),
        productDupNames: productDupWeights.split(",").map(Number),
      });
      setDuplicateProductDupCount(response.data.duplicateCount);
    } catch (error) {
      console.log(error);
    }
  };

  const howManyWordsDescription = (
    <p>
      A sentence is made up of a group of words. Each word is a sequence of letters, ('a'-'z', 'A'-'Z'), that may contain one or more hyphens and may end in a punctuation mark: period (.), comma (,), question mark (?) or exclamation point (!). Words will be separated by one or more white space characters. Hyphens join two words into one and should be retained while the other punctuation marks should be stripped. Determine the number of words in a given sentence. <br /><br />

      <em>Example</em> <br />
      s = 'How many eggs are in a half-dozen, 13?' <br /><br />

      The list of words in the string is ['How','many', 'eggs', 'are', 'in', 'a', 'half-dozen'] and the number of words is 7. Notice that the numeric string, '13', is not a word because is not within the allowed character set.<br /><br />

      Function Description <br />
      Complete the function howMany in the editor below. <br /><br />

      howMany has the following parameter(s): <br />
      sentence: a string<br /><br />

      Returns:<br />
      int:an integer that represents the number of words in the string<br /><br />

      <b>Sample Case 0</b><br /><br />
      - <em>Sample Input</em><br />
      he s a good programmer, he won 865 competitions, but sometimes he dont. What do you think? ALL test-cases should pass. Done-done?<br /><br />
      - <em>Sample Output</em><br />
      21<br /><br />

      - <em>Explanation</em><br />
      The substring ‘865'is not a word, so s not included in the count. The hyphenated words ‘test-cases"and ‘Done-done’each count as 1 word. The total number of words in the string is 21.<br /><br /><br />


      <b>Sample Case 1</b><br /><br />
      - <em>Sample Input</em><br />
      jds dsaf lkdf kdsa fkldsf, adsbf ldka ads? asd bfs ds bf[l. akf dhj ds 878  dwa WE DE 7475 dsfh ds  RAMU 748 dj.<br /><br />

      - <em>Sample Output</em><br />
      21<br /><br />

      - <em>Explanation</em><br />
      The substring ‘bf[l'is not a word, because of the invalid character. Other substrings that are not words are '878, '7475' and '748'. The total number of words in the string is 21.
    </p>
  )

  const priceCheckDescription = (
    <p>
      There is a shop with old-style cash registers. Rather than scanning items and pulling the price from a database, the price of each item is typed in manually. This method sometimes leads to errors. Given a list of items and their correct prices, compare the prices to those entered when each item was sold. Determine the number of errors in selling prices.<br /><br />

      <em>Example</em><br />
      products = ['eggs', 'milk', ‘cheese']<br />
      productPrices = [2.89, 3.29, 5.79]<br />
      productSold = ['eggs', ‘eggs’, ‘cheese’, 'milk']<br />
      soldPrice = [2.89, 2.99, 5.97, 3.29]<br /><br />

      Price<br />
      <table>
        <thead><tr>
          <td>Product </td>
          <td>Actual </td>
          <td>Expected </td>
          <td>Error </td>
        </tr></thead>
        <tbody>
          <tr>
            <td>eggs</td>
            <td>2.99</td>
            <td>2.89</td>
            <td>1</td>
          </tr>
          <tr>
            <td>cheese</td>
            <td>5.97</td>
            <td>5.79</td>
            <td>1</td>
          </tr>
          <tr>
            <td>milk</td>
            <td>3.29</td>
            <td>3.29</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
      <br /><br />

      The second sale of eggs has a wrong price, as does the sale of cheese. There are 2 errors in pricing.<br /><br />

      Function Description<br />
      Complete the function priceCheckin the editor below.<br />

      priceCheck has the following parameter(s):<br />
      {'string products[n]: each products[i] is the name of an item for sale'}<br />
      {'string productPrices[n]: each productPrices[i] lis the price of products[i]'}<br />
      {'string productSold[m]: each productSold[j] is the name of a product sold'}<br />
      {'float soldPrice[m]: each soldPrice[j] contains the sale price recorded for productSold[j].'}<br /><br />

      Returns:<br />
      int: the number of sale prices that were entered incorrectly.<br /><br />

      <b>Sample Case 0</b><br />
      - <em>Sample Input</em><br /><br />
      STDIN Function<br />
      {"products[] size n = 4"}<br />
      {"products=['rice', 'sugar', 'wheat', 'cheese']"}<br /><br />

      {"productPrices[] size n = 4"}<br />
      {"productPrices[16.89, 56.92, 20.89, 145.99] "}<br /><br />

      {"productSold[] size m = 2"}<br />
      {"productSold = ['rice', 'cheese']"}<br /><br />

      {"soldPrice[] size m = 2"}<br />
      {"productSold = ['rice', 'cheese']"}<br /><br />

      {"soldPrice[] size m = 2"}<br />
      {"soldPrice = [18.99, 400.89] "}<br /><br />

      - <em>Sample Output</em><br />
      2<br /><br />

      - <em>Explanation</em><br />
      Price<br />
      <table>
        <thead><tr>
          <td>Product </td>
          <td>Actual </td>
          <td>Expected </td>
          <td>Error </td>
        </tr></thead>
        <tbody>
          <tr>
            <td>rice</td>
            <td>18.99</td>
            <td>16.89</td>
            <td>1</td>
          </tr>
          <tr>
            <td>cheese</td>
            <td>400.89</td>
            <td>345.99</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
      <br /><br />

      The sales of the rice and cheese were at the wrong prices. So, the number of sales prices that were entered incorrectly is 2.
    </p>
  )

  const duplicatedProductsDescription = (
    <p>
      You are given a complex list of n products, each with a name, price, and weight. Find out how many duplicate products are present within the list. Duplicate products contain identical parameters for all fields in the list (i.e. name, price, and weight).<br /><br />

      <em>Example</em>:<br />
      There are n = 5 products with attributes listed in three arrays, aligned by index.<br /><br />

      name = [ball, bat, glove, glove, glove]<br />
      price = [2, 3, 1, 2, 1]<br />
      weight = [2, 5, 1, 1, 1]<br />

      A complete item description for item 0: (name[0], prices[0], weight[0])is (ball, 2, 2)<br /><br />

      <table>
        <thead><tr>
          <td>Name </td>
          <td>Price </td>
          <td>Weight </td>
        </tr></thead>
        <tbody>
          <tr>
            <td>ball</td>
            <td>2</td>
            <td>2</td>
          </tr>
          <tr>
            <td>bat</td>
            <td>3</td>
            <td>5</td>
          </tr>
          <tr>
            <td>glove </td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr>
            <td>glove </td>
            <td>2</td>
            <td>1</td>
          </tr>
          <tr>
            <td>glove </td>
            <td>1</td>
            <td>1</td>
          </tr>
        </tbody>
      </table><br />

      The first two items are unique.<br />
      The two gloves at indices 2 and 4 are equal in all three attributes so there is 1 duplicate.<br />
      The last glove at index 3 has a different price from the other two, so it is not a duplicate.<br />

      There is 1 duplicate item in the original list.<br /><br />

      Function Description<br />
      Complete the function numDuplicates in the editor below. The function must return an integer denoting the number of duplicates within the product list.<br /><br />

      numDuplicates has the following parameter(s):<br />

      {"string name[n]: string array of size n, where names{i] denotes the name of the product at the index of i."}<br />
      {"int price[n]: int array of size n, where prices[i] denotes the price of the product at the index of i."}<br />
      {"int weight[n]: int array of size n, where weights[i] denotes the weight of the product at the index of i."}<br /><br />

      <b>Sample Case 0</b><br /><br />
      - <em>Sample Input</em><br /><br />
      STDIN Function<br /><br />
      {"name[] size n = 5"}<br />
      {"name = ['ball', 'box', 'ball', 'ball', 'box']"}<br /><br />

      {"price[] size n = 5"}<br />
      {"price = [2, 2, 2, 2, 2]"}<br /><br />

      {"weight[] size n = 5"}<br />
      {"wight = [1, 2, 1, 1, 5]"}<br /><br />

      - <em>Sample Output</em><br />
      2<br /><br />

      - <em>Explanation</em><br />
      <table>
        <thead><tr>
          <td>Name </td>
          <td>Price </td>
          <td>Weight </td>
        </tr></thead>
        <tbody>
          <tr>
            <td>ball</td>
            <td>2</td>
            <td>1</td>
          </tr>
          <tr>
            <td>bat</td>
            <td>2</td>
            <td>2</td>
          </tr>
          <tr>
            <td>glove </td>
            <td>2</td>
            <td>1</td>
          </tr>
          <tr>
            <td>glove </td>
            <td>2</td>
            <td>1</td>
          </tr>
          <tr>
            <td>glove </td>
            <td>2</td>
            <td>3</td>
          </tr>
        </tbody>
      </table><br />

      The 3 balls have the same name, price and weight, so there are 2 duplicates. The two other products are boxes but they have different weights.
    </p>
  )

  const howManyWordsForm = (
    <form onSubmit={handleStringSubmit} className="card-form" >
      <div className="card-inputs">
        <input
          type="text"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
        />
        <button type="submit">Submit</button>
      </div>
      {
        <div className="card-output">
          <p>There are {wordsInSentence} words in your sentence.</p>
        </div>
      }
    </form>
  )

  const priceCheckForm = (
    <form onSubmit={handlePriceCheckSubmit} className="card-form">
      <div className="card-inputs">
        <input
          type="text"
          value={products}
          onChange={(e) => setProducts(e.target.value)}
          placeholder="Products (comma-separated)"
        />
        <input
          type="text"
          value={productPrices}
          onChange={(e) => setProductPrices(e.target.value.trim())}
          placeholder="Product Prices (comma-separated)"
        />
        <input
          type="text"
          value={soldProducts}
          onChange={(e) => setSoldProducts(e.target.value.trim())}
          placeholder="Sold Products (comma-separated)"
        />
        <input
          type="text"
          value={soldPrices}
          onChange={(e) => setSoldPrices(e.target.value.trim())}
          placeholder="Sold Prices (comma-separated)"
        />
        <button type="submit">Submit</button>
      </div>
      {
        <div className="card-output">
          <p>{`Number of errors: ${priceCheckResult.errorCount}`}</p>
        </div>
      }
    </form>
  );

  const duplicateProductsForm = (
    <form onSubmit={handleDuplicateProductsSubmit} className="card-form">
      <div className="card-inputs">
        <input
          type="text"
          value={productDupNames}
          onChange={(e) => setProductDupNames(e.target.value.trim())}
          placeholder="product Names (comma-separated)"
        />
        <input
          type="text"
          value={productDupPrices}
          onChange={(e) => setProductDupPrices(e.target.value.trim())}
          placeholder="product Prices (comma-separated)"
        />
        <input
          type="text"
          value={productDupWeights}
          onChange={(e) => setProductDupWeights(e.target.value.trim())}
          placeholder="product Weights (comma-separated)"
        />
        <button type="submit">Submit</button>
      </div>
      {duplicateproductDupCount !== null && (
        <div className="card-output">
          <p>{`There are ${duplicateproductDupCount} duplicate products`}</p>
        </div>
      )}
    </form>
  );

  return (
    <div>
      <h1>
        Tony's Bizont test
      </h1>
      <div className="card-grid">
        <Card
          title="Uppercase String"
          description={howManyWordsDescription}
          sourceCode="https://example.com/source"
          form={howManyWordsForm}
        />
        <Card
          title="Price Check"
          description={priceCheckDescription}
          sourceCode="https://example.com/source"
          form={priceCheckForm}
        />
        <Card
          title="Duplicated Products"
          description={duplicatedProductsDescription}
          sourceCode="https://example.com/source"
          form={duplicateProductsForm}
        />
      </div>
    </div>
  );
};

export default CardGrid;
