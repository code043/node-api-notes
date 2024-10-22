import { Note } from "../../domain/entities/note";

export default interface NoteRepository {
  getNotes(): Promise<Note[]>;
  getNoteById(id: number): Promise<Note | undefined>;
  createNote(input: Note): Promise<void>;
  updateNote(id: number, input: Note): Promise<void>;
  removeNote(id: number): Promise<void>;
}
