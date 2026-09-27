const express = require("express");
const { RoomModel } = require("../Model/Room.Model");

const roomRouter = express.Router();

roomRouter.get("/", async (req, res) => {
  try {
    let data = await RoomModel.find();
    res.send({
      message: "All rooms",
      status: 1,
      data: data,
      error: false,
    });
  } catch (error) {
    res.send({
      message: "Something went wrong: " + error.message,
      status: 0,
      error: true,
    });
  }
});

roomRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let data = await RoomModel.find({ rid: id });
    res.send({
      message: "Room info",
      status: 1,
      data: data[0],
      error: false,
    });
  } catch (error) {
    res.send({
      message: "Something went wrong: " + error.message,
      status: 0,
      error: true,
    });
  }
});

roomRouter.post("/", async (req, res) => {
  console.log(req.body);

  try {
    let room = new RoomModel(req.body);
    await room.save();
    res.send({
      message: "Room created",
      status: 1,
      error: false,
    });
  } catch (error) {
    res.send({
      message: "Room creation failed: " + error.message,
      status: 0,
      error: true,
    });
  }
});

roomRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await RoomModel.updateOne({ rid: id }, req.body);
    res.send({
      message: "updated",
      status: 1,
      error: false,
    });
  } catch (error) {
    res.send({
      message: "Something went wrong: " + error.message,
      status: 0,
      error: true,
    });
  }
});

roomRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await RoomModel.deleteOne({ rid: id });
    res.send({
      message: "deleted",
      status: 1,
      error: false,
    });
  } catch (error) {
    res.send({
      message: "Something went wrong: " + error.message,
      status: 0,
      error: true,
    });
  }
});

module.exports = {
  roomRouter,
};
