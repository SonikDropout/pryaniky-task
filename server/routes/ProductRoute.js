const express = require('express');
const app = express();
const ProductRoute = express.Router();

// Require Product model in our routes module
const Product = require('../models/Product');

// Defined store route
ProductRoute.route('/add').post(function (req, res) {
  const product = new Product(req.body);
  product.save()
    .then(product => {
      res.status(200).json(product);
    })
    .catch(err => {
      res.status(400).send("Unable to save to database");
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
ProductRoute.route('/delete').post(function (req, res) {
  Product.deleteMany({ _id: { $in: req.body } }, function (err) {
    if (err) console.log(err);
    else res.json(req.body);
  });
});

// Defined delete | remove | destroy route
ProductRoute.route('/update/:id').put(function (req, res) {
  Product.findByIdAndUpdate({ _id: req.params.id }, req.body, function (err, product) {
    if (err) res.json(err);
    else Product.findOne({ _id: req.params.id }, function (err, product) {
      if (err) res.json(err);
      else res.json(product);
    })
  });
});

module.exports = ProductRoute;