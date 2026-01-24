const { Schema, model } = require('mongoose');
const z = require('zod');

const todoSchema = new Schema(
  {
    userId: Number,
    title: String,
    completed: Boolean,
  },
  { timestamps: true },
);

const Model = model('Task', todoSchema);

const InputParam = z.object({
  jsonId: z.string(),
});

const InputSchema = z.strictObject({
  userId: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

module.exports = { Model, InputSchema, InputParam };
