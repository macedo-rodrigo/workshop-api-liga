const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const team = new Team(
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

const Sample = mongoose.model("Team", teamSchema);
module.exports = { Team };