import React, { useState } from "react";
import axios from "axios";

import Card from './components/Card';

import './normalize.css';
import './App.css';

const CardGrid: React.FC = () => {
  const [sentence, setSentence] = useState("");
  const [wordsInSentence, setWordsInSentence] = useState("");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [sum, setSum] = useState(0);

  const handleStringSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/countwords", { sentence: sentence });
      setWordsInSentence(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSumSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/sum", { num1, num2 });
      setSum(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const howManyWordsDescription = (
    <p>
      A sentence is made up of a group of words. Each word is a sequence of letters, ('a'-'z', 'A'-'Z'), that may contain one or more hyphens and may end in a punctuation mark: period (.), comma (,), question mark (?) or exclamation point (!). Words will be separated by one or more white space characters. Hyphens join two words into one and should be retained while the other punctuation marks should be stripped. Determine the number of words in a given sentence. <br /><br />

      Example <br />
      s = 'How many eggs are in a half-dozen, 13?' <br /><br />

      The list of words in the string is ['How','many', 'eggs', 'are', 'in', 'a', 'half-dozen'] and the number of words is 7. Notice that the numeric string, '13', is not a word because is not within the allowed character set.<br /><br />

      Function Description <br />
      Complete the function howMany in the editor below. <br /><br />

      howMany has the following parameter(s): <br />
      sentence: a string<br /><br />

      Returns:<br />
      int:an integer that represents the number of words in the string<br /><br />

      Sample Case 0<br />
      - Sample Input<br />
      he s a good programmer, he won 865 competitions, but sometimes he dont. What do you think? ALL test-cases should pass. Done-done?<br /><br />
      - Sample Output<br />
      21<br /><br />

      - Explanation<br />
      The substring ‘865'is not a word, so s not included in the count. The hyphenated words ‘test-cases"and ‘Done-done’each count as 1 word. The total number of words in the string is 21.<br /><br /><br />


      Sample Case 1<br />
      - Sample Input<br />
      jds dsaf lkdf kdsa fkldsf, adsbf ldka ads? asd bfs ds bf[l. akf dhj ds 878  dwa WE DE 7475 dsfh ds  RAMU 748 dj.<br /><br />

      - Sample Output<br />
      21<br /><br />

      - Explanation<br />
      The substring ‘bf[l'is not a word, because of the invalid character. Other substrings that are not words are '878, '7475' and '748'. The total number of words in the string is 21.<br /><br />
    </p>
  )

  const priceCheckDescription = (
    <p>
      There is a shop with old-style cash registers. Rather than scanning items and pulling the price from a database, the price of each item is typed in manually. This method sometimes leads to errors. Given a list of items and their correct prices, compare the prices to those entered when each item was sold. Determine the number of errors in selling prices.<br /><br />

      Example<br />
      products = [eggs,, milk, ‘cheese]<br />
      productPrices = [2.89, 3.29, 5.79]<br />
      productSold = [eggs, ‘eggs’, ‘cheese’, milk]<br />
      soldPrice = [2.89, 2.99, 5.97, 3.29].<br /><br />

      Price<br />
      Product Actual Expected Error<br />
      eggs 2.89  2.89<br />
      eggs 2.99  2.89 1<br />
      cheese  5.97  5.79 1<br />
      milk 3.29  3.29<br /><br />

      The second sale of eggs has a wrong price, as does the sale of cheese. There are 2errors in pricing.<br /><br />

      Function Description<br />
      Complete the function priceCheckin the editor below.<br />

      priceCheck has the following parameter(s):<br />
      {'string productsfn]: each products(i]is the name of an item for sale'}<br />
      {'string productPricesin: each productPrices{ilis the price of productsfi]'}<br />
      {'string productSoldjm}: each productSold[jis the name of a product sold'}<br />
      {'float soldPrice[m}: each soldPricefj] contains the sale price recorded for productSold[jl.'}<br /><br />

      Returns:<br />
      int: the number of sale prices that were entered incorrectly<br /><br />

      Sample Case 0<br />
      - Sample Input<br /><br />
      STDIN Function<br />
      {"4     ->  products[] size n = 4"}<br />
      {"rice  ->  products=['rice', 'sugar', 'wheat', 'cheese']"}<br />
      sugar<br />
      wheat<br />
      cheese<br />
      {"4     ->  productPrices[] size n = 4"}<br />
      {"16.89 ->  productPrices[16.89, 56.92, 20.89, 145.99] "}<br />
      56.92<br />
      20.89<br />
      345.99<br />
      {"2     ->  productSold[] size m = 2"}<br />
      {"rice  ->  productSold = ['rice', 'cheese']"}<br />
      cheese<br />
      {"2     ->  soldPrice[] size m = 2"}<br />
      {"rice  ->  productSold = ['rice', 'cheese'] "}<br />
      cheese<br />
      {"2     ->  soldPrice[] size m = 2"}<br />
      {"18.99 ->  soldPrice = [18.99, 400.89] "}<br />
      400.89<br /><br />

      - Sample Output 0<br />
      2<br /><br />

      - Explanation 0<br />
      Price<br />
      Product   Actual    Expected    Error<br />
      rice      18.99     16.89       1<br />
      cheese    400.89    345.99      1<br /><br />

      The sales of the rice and cheese were at the wrong prices. So, the number of sales prices that were entered incorrectly is 2.<br />
    </p>
  )

  const duplicatedProductsDescription = (
    <p>
      You are given a complex list of n products, each with a name, price, and weight. Find out how many duplicate products are present within the list. Duplicate products contain identical parameters for all fields in the list (i.e. name, price, and weight).<br /><br />

      Example:<br />
      There are n = 5 products with attributes listed in three arrays, aligned by index.<br /><br />

      name = [ball, bat, glove, glove, glove]<br />
      price = [2, 3, 1, 2, 1]<br />
      weight = [2, 5, 1, 1, 1]<br />

      A complete item description for item 0: (name[0], prices[0], weight[0])is (ball, 2, 2)<br /><br />

      Name  Price Weight<br />
      ball 2 2<br />
      bat 3 5<br />
      glove 1 1<br />
      glove 2 1<br />
      glove 1 1<br /><br />

      The first two items are unique.<br />
      The two gloves at indices 2 and 4 are equal in all three attributes so there is 1 duplicate.<br />
      The last glove at index 3 has a different price from the other two, so it is not a duplicate.<br />

      There is 1 duplicate item in the original list.<br /><br />

      Function Description<br />
      Complete the function numDuplicates in the editor below. The function must return an integer denoting the number of duplicates within the product list.<br /><br />

      numDuplicates has the following parameter(s):<br />

      {"string name[n]: string array of size n, where names{i] denotes the name of the product at the index of i."}<br />
      {"int price[n]: int array of size n, where prices[i] denotes the price of the product at the index of i."}<br />
      {"int weight[n]: int array of size n, where weights[i] denotes the weight of the product at the index of i."}<br />

      Sample Case 0<br />
      - Sample Input 0<br /><br />
      STDIN Function<br />
      {"5 -> name[] size n = 5"}<br />
      {"ball -> name = ['ball', 'box', 'ball', 'ball', 'box']"}<br />
      box<br />
      ball<br />
      ball<br />
      box<br />
      {"5 -> price[] size n = 5"}<br />
      {"2 -> price = [2, 2, 2, 2, 2]"}<br />
      2<br />
      2<br />
      2<br />
      2<br />
      {"5 -> weight[] size n = 5"}<br />
      {"1 -> wight = [1, 2, 1, 1, 5]"}<br />
      2<br />
      1<br />
      1<br />
      3<br /><br />

      - Sample Output 0<br />
      2<br /><br />

      - Explanation<br />
      Name Price Weight<br />
      ball 2 1<br />
      box 2 2<br />
      ball 2 1<br />
      ball 2 1<br />
      box 2 3<br /><br />

      The 3 balls have the same name, price and weight, so there are 2 duplicates. The two other products are boxes but they have different weights.<br />
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
        wordsInSentence && (
          <div className="card-output">
            <p>{wordsInSentence}</p>
          </div>
        )
      }
    </form>
  )

  const priceCheckForm = (
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
        wordsInSentence && (
          <div className="card-output">
            <p>{wordsInSentence}</p>
          </div>
        )
      }
    </form>
  )

  const duplicateProductsForm = (
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
        wordsInSentence && (
          <div className="card-output">
            <p>{wordsInSentence}</p>
          </div>
        )
      }
    </form>
  )

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
