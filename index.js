// core
const fs = require('fs');
const http = require('http');
const url = require('url');
// third party

const slugify = require('slugify');

// own
const replaceTemplate = require('./modules/replaceTemplate');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const products = dataObj.map((el) => {
  return { ...el, slug: slugify(el.productName, { lower: true }) };
});

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const server = http.createServer((req, response) => {
  const { query, pathname } = url.parse(req.url, true);

  // Home and overview
  if (pathname === '/' || pathname === '/overview') {
    response.writeHead(200, {
      'content-type': 'text/html',
    });

    const cardsHtml = products.map((el) => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    response.end(output);

    // Product
  } else if (pathname === '/product') {
    const product = products.find((pro) => pro.slug === query.slug);
    response.writeHead(200, {
      'content-type': 'text/html',
    });
    const output = replaceTemplate(tempProduct, product);
    response.end(output);

    //API
  } else if (pathname === '/api') {
    response.writeHead(200, {
      'Content-type': 'application/json',
    });
    response.end(data);

    // Not found
  } else {
    response.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-header!',
    });
    response.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on http://127.0.0.1:8000 ');
});
