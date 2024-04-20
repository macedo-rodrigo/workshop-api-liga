const express = require("express");

// Modelos
const { Team } = require("../models/Team.js");

const router = express.Router();

// CRUD: READ
router.get("/", async (req, res) => {
  try {
    // Asi leemos query params
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const team = await Team.find()
      .limit(limit)
      .skip((page - 1) * limit);

    // Num total de elementos
    const totalElements = await Team.countDocuments();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: team,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: READ
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let team = await Team.findById(id);

    if (team) {
      const includeParents = req.query.includeParents === "true";

      if (includeParents) {
        const parents = await Team.find({ child: id });
        if (parents) {
          team = team.toObject();
          team.parents = parents;
        }
      }

      res.json(team);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: CREATE
router.post("/", async (req, res) => {
  console.log(req.headers);

  try {
    const team = new Team(req.body);
    const createdteam = await Team.save();
    return res.status(201).json(createdteam);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const teamDeleted = await Team.findByIdAndDelete(id);
    if (teamDeleted) {
      res.json(teamDeleted);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: UPDATE
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const teamUpdated = await Team.findByIdAndUpdate(id, req.body, { new: true });
    if (teamUpdated) {
      res.json(teamUpdated);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = { teamRouter: router };
