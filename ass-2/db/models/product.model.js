const mongoose = require('mongoose');
const z = require('zod');

const { Schema } = mongoose;

const InputSchema = z.strictObject({
  name: z.string(),
  onSale: z.boolean().optional(),
});

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    onSale: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

const Model = mongoose.model('Product', productSchema);

module.exports = { Model, InputSchema };
