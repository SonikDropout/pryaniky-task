const express = require('express');
const app = express();
const ProductRoute = express.Router();

// Require Product model in our routes module
let Product = require('../models/Product');

// Defined store route
ProductRoute.route('/add').post(function (req, res) {
  let product = new Product(req.body);
  product.save()
    .then(product => {
      res.status(200).json(product);
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
ProductRoute.route('/').get(function (req, res) {
  Product.find(function (err, products) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(products);
    }
  });
});

// Defined delete | remove | destroy route
ProductRoute.route('/delete/:id').get(function (req, res) {
  Product.findByIdAndRemove({ _id: req.params.id }, function (err, product) {
    if (err) res.json(err);
    else res.json(req.params.id);
  });
});

module.exports = ProductRoute;