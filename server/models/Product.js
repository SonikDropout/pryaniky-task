const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Product
const Product = new Schema(
  {
    name: {
      type: String
    },
    price: {
      type: Number
    },
    description: {
      type: String
    }
  },
  {
    collection: 'products'
  }
);

module.exports = mongoose.model('Product', Product);