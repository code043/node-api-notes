import NoteRepository from "../repositories/NoteRepository";

class UpdateNote {
  repositorio;
  constructor(noteRepository: NoteRepository) {
    this.repositorio = noteRepository;
  }
  async execute(id: number, input: Input): Promise<void> {
    return await this.repositorio.updateNote(id, input);
  }
}

type Input = {
  title: string;
  body: string;
  date?: Date;
};
export default UpdateNote;
