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
  const data = req.body; //{title , description}
  await noteModel.create({
    title: data.title,
    description: data.description,
  });

  res.status(201).json({
    message: "Note Created",
  });
});

/* GET /notes =>GET all note*/
app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();
  //find() => [{}, {}] or [] & findOne() => {} or null
  res.status(200).json({
    message: "Notes Fetched successfully",
    notes: notes,
  });
});

/* DELETE /notes:/id =>Delete a note*/
app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  await noteModel.findOneAndDelete({
    _id: id,
  });
  res.status(200).json({
    message: "Note Deleted successfully",
  });
});

/* PATCH /notes/:id =>UPDATE a  note*/
app.patch("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const description = req.body.description;
  await noteModel.findOneAndUpdate({ _id: id }, { description: description });

  res.status(200).json({
    message: "Note Updated Successfully",
  });
});

module.exports = app;
