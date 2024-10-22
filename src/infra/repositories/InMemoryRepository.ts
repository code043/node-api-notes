import { Note } from "../../domain/entities/note";
import NoteRepository from "../../application/repositories/NoteRepository";
import NoteNotFoundError from "../../domain/errors/NoteNotFoundError";

class InMemoryRepository implements NoteRepository {
  private notes: Note[] = [];
  constructor() {
    this.notes = [
      {
        id: 1,
        title: "Note",
        body: "Annotations...",
      },
    ];
  }
  async getNoteById(id: number): Promise<Note | undefined> {
    const note = await this.notes.find((note) => note.id === id);
    return note;
  }
  async getNotes(): Promise<Note[]> {
    return await this.notes;
  }
  async createNote(input: Note): Promise<void> {
    const newNote = {
      ...input,
      id: this.notes.length + 1,
    };
    await this.notes.push(newNote);
  }
}
export default new InMemoryRepository();
