import { Request, Response } from "express";

import PrismaRepository from "../../infra/repositories/PrismaRepository";
import CreateNote from "../../application/usecases/note/CreateNote";
import DeleteNote from "../../application/usecases/note/DeleteNote";
import GetNoteById from "../../application/usecases/note/GetNoteById.";
import GetNotes from "../../application/usecases/note/GetNotes";
import UpdateNote from "../../application/usecases/note/UpdateNote";
import NoteNotFoundError from "../../domain/errors/NoteNotFoundError";

export const NoteController = {
  async getAllNotes(req: Request, res: Response) {
    try {
      const getNotes = new GetNotes(PrismaRepository);
      const notes = await getNotes.execute();
      res.status(200).json({
        quantity: notes.length,
        notes: notes,
      });
    } catch (error) {
      console.error("Error getting notes: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async getNoteById(req: Request, res: Response) {
    const { id } = req.params;
    const getNote = new GetNoteById(PrismaRepository);
    try {
      const note = await getNote.execute(Number(id));
      if (!note?.id) throw new NoteNotFoundError(Number(id));
      res.status(200).json({
        note: note,
      });
    } catch (error) {
      if (error instanceof NoteNotFoundError) {
        res.status(404).json({
          message: error.message,
        });
      } else {
        res.status(500).json({
          message: "Internal Error",
        });
      }
    }
  },
  async createNote(req: Request, res: Response) {
    const createNote = new CreateNote(PrismaRepository);
    await createNote.execute(req.body);
    res.status(201).json({
      message: "Note has created",
      note: req.body,
    });
  },
  async updateNote(req: Request, res: Response) {
    const { id } = req.params;

    const updateNote = new UpdateNote(PrismaRepository);
    try {
      await updateNote.execute(Number(id), req.body);
      res.status(200).json({
        message: "Note with ID " + id + " has updated",
        note: req.body,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  async removeNote(req: Request, res: Response) {
    const { id } = req.params;

    const deleteNote = new DeleteNote(PrismaRepository);
    try {
      await deleteNote.execute(Number(id));
      res.status(200).json({
        message: "Note with ID " + id + " has deleted",
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};
