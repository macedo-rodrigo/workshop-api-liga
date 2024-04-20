const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Match } = require("../models/Match.js");
const { Team } = require("../models/Team.js");

const createMatches = async () => {
  try {
    // CONEXION
    const database = await connect();

    // BORRADO DE PARTIDOS ANTERIORES
    await Match.collection.drop();
    console.log("Partidos anteriores eliminados");

    // OBTENER EQUIPOS
    const teams = await Team.find();

    // CREAR PARTIDOS
    const matches = [];
    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams.length; j++) {
        if (i !== j) {
          const match1 = new Match({
            localTeam: teams[i]._id,
            visitorTeam: teams[j]._id,
            date: new Date(), // Puedes ajustar la fecha según tu necesidad
          });
          const match2 = new Match({
            localTeam: teams[j]._id,
            visitorTeam: teams[i]._id,
            date: new Date(), // Puedes ajustar la fecha según tu necesidad
          });
          matches.push(match1);
          matches.push(match2);
        }
      }
    }

    // INSERCIÓN DE PARTIDOS
    await Match.insertMany(matches);
    console.log("Partidos creados correctamente");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

createMatches();
