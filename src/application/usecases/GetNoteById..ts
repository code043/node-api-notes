import NoteRepository from "../repositories/NoteRepository";

class GetNoteById {
  repositorio;
  constructor(noteRepository: NoteRepository) {
    this.repositorio = noteRepository;
  }
  async execute(id: number): Promise<Output | undefined> {
    const note = await this.repositorio.getNoteById(id);

    return note;
  }
}
type Output = {
  id?: number;
  title: string;
  body: string;
  date?: Date;
};
export default GetNoteById;
