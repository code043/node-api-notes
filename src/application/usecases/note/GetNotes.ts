import NoteRepository from "../repositories/NoteRepository";

class GetNotes {
  repositorio;
  constructor(noteRepository: NoteRepository) {
    this.repositorio = noteRepository;
  }
  async execute(): Promise<Output[]> {
    return await this.repositorio.getNotes();
  }
}
type Output = {
  id?: number;
  title: string;
  body: string;
  date?: Date;
};
export default GetNotes;
