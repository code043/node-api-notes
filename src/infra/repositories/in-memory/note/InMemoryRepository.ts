import { Note } from "@prisma/client";
import NoteRepository from "../../../../application/repositories/NoteRepository";

class InMemoryRepository implements NoteRepository {
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
    const note = await this.notes.find((note) => note?.id === id);
    return note;
  }
  async getNotes(): Promise<Note[]> {
    return await this.notes;
  }
  async createNote(input: Note): Promise<void> {
    const newNote = {
      ...input,
      id: this.notes.length + 1,
      date: new Date(),
    };
    await this.notes.push(newNote);
  }

  async updateNote(id: number, input: Note): Promise<void> {
    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].id === id) {
        this.notes[i] = { ...input, id: id };
      }
    }
  }
  async removeNote(id: number): Promise<void> {
    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].id === id) {
        this.notes.splice(i, 1);
        break;
      }
    }
  }
}
export default new InMemoryRepository();
