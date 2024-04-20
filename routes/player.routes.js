const express = require("express");

// Modelos
const { Player } = require("../models/Player.js");

const router = express.Router();

// CRUD: READ
router.get("/", async (req, res) => {
  try {
    // Asi leemos query params
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const player = await Player.find()
      .limit(limit)
      .skip((page - 1) * limit);

    // Num total de elementos
    const totalElements = await Player.countDocuments();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: Player,
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
    let player = await Player.findById(id);

    if (player) {
      const includeParents = req.query.includeParents === "true";

      if (includeParents) {
        const parents = await Player.find({ child: id });
        if (parents) {
          Player = Player.toObject();
          Player.parents = parents;
        }
      }

      res.json(player);
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
    const player = new Player(req.body);
    const createdPlayer = await Player.save();
    return res.status(201).json(createdPlayer);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const playerDeleted = await Player.findByIdAndDelete(id);
    if (playerDeleted) {
      res.json(playerDeleted);
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
    const playerUpdated = await Player.findByIdAndUpdate(id, req.body, { new: true });
    if (playerUpdated) {
      res.json(playerUpdated);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = { playerRouter: router };
