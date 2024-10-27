import DeleteNote from "../src/application/usecases/note/DeleteNote";
import GetNoteById from "../src/application/usecases/note/GetNoteById.";
import repository from "../src/infra/repositories/in-memory/note/InMemoryRepository";

test("should delete a note by ID", async () => {
  const usecase = new DeleteNote(repository);
  const getNote = new GetNoteById(repository);
  await usecase.execute(1);
  const note = await getNote.execute(1);
  expect(note?.id).toBeUndefined();
});
