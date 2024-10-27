import NoteRepository from "../repositories/NoteRepository";

class CreateNote {
  repositorio;
  constructor(noteRepository: NoteRepository) {
    this.repositorio = noteRepository;
  }
  async execute(input: Input): Promise<void> {
    return await this.repositorio.createNote(input);
  }
}

type Input = {
  title: string;
  body: string;
  date?: Date;
};
export default CreateNote;
