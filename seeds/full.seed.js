const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Team } = require("../models/Team.js");
const { Player } = require("../models/Player.js");

let playerList = [
  {
    name: "Alex",
    lastName: "jsjs",
    number: 13,
    team: null,
  },
  {
    name: "Dani",
    lastName: "Sample",
    number: 69,
    team: null,
  },
];

let teamList = [
  {
    name: "Real Madrid",
  },
  {
    name: "FC Barcelona",
  },
  {
    name: "Atlético Madrid",
  },
  {
    name: "Sevilla FC",
  },
  {
    name: "Valencia CF",
  },
];

const fullSeed = async () => {
  try {
    // CONEXION
    const database = await connect();

    // BORRADO
    await Team.collection.drop();
    await Player.collection.drop();
    console.log("Borrados equipos y jugadores");

    // CREACION DOCUMENTOS
    playerList = playerList.map((elem) => new Player(elem));
    teamList = teamList.map((elem) => new Team(elem));

    // ASIGNACIÓN DE EQUIPOS A JUGADORES
    playerList[0].team = teamList[0]._id; // Alex -> Real Madrid
    playerList[1].team = teamList[4]._id; // Dani -> Valencia CF

    // INSERCIÓN DE EQUIPOS Y JUGADORES
    await Team.insertMany(teamList);
    await Player.insertMany(playerList);
    console.log("Creados equipos y jugadores correctamente");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

fullSeed();