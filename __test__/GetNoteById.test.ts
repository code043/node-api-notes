import GetNoteById from "../src/application/usecases/GetNoteById.";
import repository from "../src/infra/repositories/InMemoryRepository";

test("should get a note by ID", async () => {
  const usecase = new GetNoteById(repository);
  const note = await usecase.execute(1);
  expect(note?.id).toBe(1);
  expect(note?.title).toBe("Nota");
});
