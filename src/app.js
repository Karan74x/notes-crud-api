//creating the server
const express = require("express");
const noteModel = require("./models/note.model.js");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`GO TO THE NOTES PAGE -> ${"http://localhost:3000/notes"}`);
});

/* POST /notes =>create a note*/
app.post("/notes", async (req, res) => {
  try {
    const data = req.body; //{title , description}
    await noteModel.create({
      title: data.title,
      description: data.description,
    });

    res.status(201).json({
      message: "Note Created",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create note",
      error: err.message,
    });
  }
});

/* GET /notes =>GET all note*/
app.get("/notes", async (req, res) => {
  try {
    const notes = await noteModel.find();
    //find() => [{}, {}] or [] & findOne() => {} or null
    res.status(200).json({
      message: "Notes Fetched successfully",
      notes: notes,
    });
  } catch (err) {
    res.status(500).json({
      message: "failed to fetch notes",
      error: err.message,
    });
  }
});

//find a User by id
app.get("/notes/:id", async (req, res) => {
  try {
    let note = await noteModel.findOne({ _id: req.params.id });
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "User fetched successfully",
      note: note,
    });
  } catch (err) {
    res.status(400).json({
      message: "Invalid note Id",
      error: err.message,
    });
  }
});

/* DELETE /notes:/id =>Delete a note*/
app.delete("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await noteModel.findOneAndDelete({
      _id: id,
    });
    res.status(200).json({
      message: "Note Deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: "Invalid note id",
      error: err.message,
    });
  }
});

/* PATCH /notes/:id =>UPDATE a  note*/
app.patch("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const description = req.body.description;
    const updateNote = await noteModel.findOneAndUpdate(
      { _id: id },
      { description: description },
      { new: true },
    );

    if (!updateNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note Updated Successfully",
      note: updateNote,
    });
  } catch (err) {
    res.status(400).json({
      message: "Invalid Note Id",
      error: err.message,
    });
  }
});

module.exports = app;
