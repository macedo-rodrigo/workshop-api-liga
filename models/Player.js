const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: false,
      
    },
    number: {
      type: number,
      required: false,
      
    },
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model("Sample", playerSchema);
module.exports = { Player };
