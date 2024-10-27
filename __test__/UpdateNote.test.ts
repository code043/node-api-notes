import GetNoteById from "../src/application/usecases/note/GetNoteById.";
import UpdateNote from "../src/application/usecases/note/UpdateNote";
import repository from "../src/infra/repositories/in-memory/note/InMemoryRepository";

test("should update a note", async () => {
  const update = new UpdateNote(repository);
  const get = new GetNoteById(repository);
  const input = {
    title: "Nota atualizada",
    body: "Anotado...",
  };
  await update.execute(1, input);
  const note = await get.execute(1);
  expect(note?.title).toBe("Nota atualizada");
});
