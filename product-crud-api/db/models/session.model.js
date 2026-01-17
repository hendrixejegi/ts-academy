const mongoose = require('mongoose');

const { Schema } = mongoose;

const sessionSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

const Model = mongoose.model('Session', sessionSchema);

module.exports = { Model };
