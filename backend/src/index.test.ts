import request from 'supertest';
import { app } from '../src/index';

describe('API Tests', () => {
  // Count words in string
  test('/api/countwords', async () => {
    const response = await request(app)
      .post('/api/countwords')
      .send({ sentence: 'This is a test a[234 sentence. My name is Tony?' });

    expect(response.status).toBe(200);
    expect(response.body).toBe(9); // Assuming there are 9 words in the sentence
  });

  test('/api/countwords', async () => {
    const response = await request(app)
      .post('/api/countwords')
      .send({ sentence: 'he is a good programmer, he won 865 competitions, but sometimes he dont. What do you think? ALL test-cases should pass. Done-done?' });

    expect(response.status).toBe(200);
    expect(response.body).toBe(21); // Assuming there are 9 words in the sentence
  });

  test('/api/countwords', async () => {
    const response = await request(app)
      .post('/api/countwords')
      .send({ sentence: 'jds dsaf lkdf kdsa fkldsf, adsbf ldka ads? asd bfs ds bf[l. akf dhj ds 878 dwa WE DE 7475 dsfh ds RAMU 748 dj.' });

    expect(response.status).toBe(200);
    expect(response.body).toBe(21); // Assuming there are 9 words in the sentence
  });


  // Check sold prices and expected prices
  test('/api/pricecheck', async () => {
    const requestPayload = {
      products: ['product1', 'product2', 'product3'],
      productPrices: [10, 20, 30],
      soldProducts: ['product1', 'product2', 'product3'],
      soldPrices: [10, 20, 30],
    };

    const response = await request(app)
      .post('/api/pricecheck')
      .send(requestPayload);

    expect(response.status).toBe(200);
    expect(response.body.errorCount).toBe(0); // Assuming no pricing errors
  });

  test('/api/pricecheck', async () => {
    const requestPayload = {
      products: ['rice', 'sugar', 'wheat', 'cheese'],
      productPrices: [16.89, 56.92, 20.89, 145.99],
      soldProducts: ['rice', 'cheese'],
      soldPrices: [18.99, 400.89],
    };

    const response = await request(app)
      .post('/api/pricecheck')
      .send(requestPayload);

    expect(response.status).toBe(200);
    expect(response.body.errorCount).toBe(2); // Assuming 2 pricing errors
  });


  // Check duplicated products
  test('/api/checkduplicateproducts', async () => {
    const requestPayload = {
      productDupNames: ['ball', 'bat', 'glove', 'glove', 'glove'],
      productDupPrices: [2, 3, 1, 2, 1],
      productDupWeights: [2, 5, 1, 1, 1],
    };

    const response = await request(app)
      .post('/api/checkduplicateproducts')
      .send(requestPayload);

    expect(response.status).toBe(200);
    expect(response.body.duplicateCount).toBe(1); // Assuming 1 duplicate product
  });

  test('/api/checkduplicateproducts', async () => {
    const requestPayload = {
      productDupNames: ['ball', 'gox', 'ball', 'ball', 'box'],
      productDupPrices: [2, 2, 2, 2, 2],
      productDupWeights: [1, 2, 1, 1, 5],
    };

    const response = await request(app)
      .post('/api/checkduplicateproducts')
      .send(requestPayload);

    expect(response.status).toBe(200);
    expect(response.body.duplicateCount).toBe(2); // Assuming 2 duplicate product
  });
});
