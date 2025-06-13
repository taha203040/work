import { Router } from "express";
import {
  createNote,
  editNote,
  deleteNoteById,
  getNotesById,
} from "../controllers/note.controllers.js";

const notesRouter = Router();

notesRouter.get("/notes/:userId", getNotesById);
notesRouter.put("/notes/:id", editNote);
notesRouter.post("/notes/create/", createNote);
notesRouter.delete("/notes/:id", deleteNoteById);
export default notesRouter;
