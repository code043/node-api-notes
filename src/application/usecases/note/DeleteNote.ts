import NoteRepository from "../../repositories/NoteRepository";

class DeleteNote {
  repositorio;
  constructor(noteRepository: NoteRepository) {
    this.repositorio = noteRepository;
  }
  async execute(id: number): Promise<void> {
    await this.repositorio.removeNote(id);
  }
}

export default DeleteNote;
