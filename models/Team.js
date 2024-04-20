const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const team = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", teamSchema);
module.exports = { Team };