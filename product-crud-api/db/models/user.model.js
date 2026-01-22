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
      unique: true,
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
  { timestamps: true, strict: true },
);

const Model = mongoose.model('User', userSchema);

const BasePassword = z.string();

const SignUpSchema = z.object({
  name: z.string(),
  email: z.email(),
  admin: z.boolean().optional(),
  password: BasePassword.min(8).max(15),
});

const SignInSchema = z.object({
  email: z.email(),
  password: BasePassword,
});

module.exports = { Model, SignUpSchema, SignInSchema };
