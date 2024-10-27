import NoteRepository from "../../application/repositories/NoteRepository";
import { PrismaClient } from "@prisma/client";
import Note from "../../domain/entities/note";

const prisma = new PrismaClient();

class PrismaRepository implements NoteRepository {
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
  async updateNote(id: number, input: Note): Promise<void> {
    await prisma.note.update({
      where: { id: Number(id) },
      data: input,
    });
  }
  async removeNote(id: number): Promise<void> {
    await prisma.note.delete({
      where: { id: id },
    });
  }
}

export default new PrismaRepository();
