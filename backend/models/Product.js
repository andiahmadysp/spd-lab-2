const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama produk wajib diisi'],
    trim: true
  },
  cat: {
    type: String,
    required: [true, 'Kategori produk wajib diisi'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Harga produk wajib diisi'],
    min: 0
  },
  material: {
    type: String,
    default: '-'
  },
  dimensi: {
    type: String,
    default: '-'
  },
  berat: {
    type: String,
    default: '-'
  },
  garansi: {
    type: String,
    default: '-'
  },
  sku: {
    type: String,
    default: '-'
  },
  desc: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    required: [true, 'URL gambar produk wajib diisi']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create virtual id field for easy frontend compatibility
productSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Product', productSchema);
