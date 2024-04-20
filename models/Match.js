const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Team } = require("../models/Team");

const matchSchema = new Schema(
  {
    localTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Team,
      required: true,
    },
    visitorTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Team,
      required: true,
    },
    localGoal: {
      type: Number,
      required: false,
    },
    visitorGoal: {
      type: Number,
      required: false,
    },
    played: {
      type: Boolean,
      required: false,
    },
    date: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Match = mongoose.model("Match", matchSchema);
module.exports = { Match };
