const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Team } = require("./Team.js");

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
      type: Number,
      required: false,
    },
    team:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: Team,
    }
      
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model("Player", playerSchema);
module.exports = { Player };
