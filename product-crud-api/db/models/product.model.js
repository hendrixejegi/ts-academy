const mongoose = require('mongoose');
const z = require('zod');
const { MAX_UPLOAD_SIZE_BYTES } = require('../../lib/constants');

const { Schema } = mongoose;

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
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  },
);

const Model = mongoose.model('Product', productSchema);

const fileSchema = z.file();
fileSchema.max(MAX_UPLOAD_SIZE_BYTES);
fileSchema.mime(['image/png', 'image/jpeg']);

const onSaleEnum = z.enum(['true', 'false']);

const InputSchema = z.strictObject({
  name: z.string(),
  onSale: z.union([onSaleEnum, z.boolean()]).optional(),
});

const UpdateSchema = InputSchema.partial();

const FindProductByIDSchema = z.strictObject({
  productId: z.string(),
});

module.exports = { Model, InputSchema, UpdateSchema, FindProductByIDSchema };
