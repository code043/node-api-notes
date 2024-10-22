export default class NoteNotFoundError extends Error {
  constructor(id: number) {
    super(`Note width ID ${id} not found!`);
    this.name = "NoteNotFoundError";
  }
}
