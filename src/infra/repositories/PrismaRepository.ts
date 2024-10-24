import NoteRepository from "../../application/repositories/NoteRepository";
import { Note } from "../../domain/entities/note";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PrismaRepository implements NoteRepository {
  private notes: Note[] = [];
  constructor() {
    this.notes = [
      {
        id: 1,
        title: "Note",
        body: "Annotations...",
        date: new Date("2024-10-23T17:48:30.044Z"),
      },
    ];
  }

  async getNoteById(id: number): Promise<Note | undefined> {
    const note = await prisma.note.findUnique({
      where: {
        id: id,
      },
    });
    return note as Note;
  }
  async getNotes(): Promise<Note[]> {
    return await prisma.note.findMany();
  }
  async createNote(input: Note): Promise<void> {
    await prisma.note.create({
      data: input,
    });
  }
  async removeNote(id: number): Promise<void> {
    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].id === id) {
        this.notes.splice(i, 1);
        break;
      }
    }
  }
  async updateNote(id: number, input: Note): Promise<void> {
    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].id === id) {
        this.notes[i] = { ...input, id: id };
      }
    }
  }
}

export default new PrismaRepository();
