const mongoose = require('mongoose');
const z = require('zod');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true, strict: true }
);

const Model = mongoose.model('User', userSchema);

const InputSchema = z.strictObject({
  name: z.string(),
  email: z.email(),
  admin: z.boolean().optional(),
  password: z.string().min(8).max(15),
});

module.exports = { Model, InputSchema };
