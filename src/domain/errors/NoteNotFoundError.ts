export default class NoteNotFoundError extends Error {
  constructor(id: number) {
    super(`Note with ID ${id} not found!`);
    this.name = "NoteNotFoundError";
  }
}
