const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor' },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  floorSpace: { type: String, required: true },
  overallSize: { type: String, required: true },
  price: { type: String, required: true },
  noBathroom: { type: String },
  noBedroom: { type: String },
  roomVideo: { type: String }, // Video file path
  approved: { type: Boolean, default: false },
  image: { type: String },
  galleryimage1: { type: String },
  galleryimage2: { type: String },
  galleryimage3: { type: String },
  galleryimage4: { type: String },
  active: { type: Boolean, default: true },
  feature: { type: Boolean, default: false },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Maincategory', required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
