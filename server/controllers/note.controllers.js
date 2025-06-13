import Note from "../models/notes.model.js";
import notesRouter from "../routes/notes.routes.js";

export const createNote = async (req, res) => {
  try {
    const note = new Note({ content: req.body.content, user: req.body.user });
    // console.log(req);
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.log(error);
  }
};
export const getNotes = async () => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    console.log(error);
  }
};
export const editNote = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedNote) return res.status(404).json({ error: "Note not found " });
    res.status(200).json({ msg: "the not edited succsesful" });
  } catch (error) {
    console.log(error);
  }
};

export const getNotesById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const notes = await Note.find({ user: userId });
    res.status(200).json(notes);
  } catch (err) {
    console.log(err);
  }
};
export const deleteNoteById = async (req, res) => {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote) {
      res.status(400).json({ msg: "Error delete", succses: false });
    }
    res.status(200).json({ msg: "Note deleted succses", succses: true });
  } catch (err) {
    console.log(err);
  }
};
