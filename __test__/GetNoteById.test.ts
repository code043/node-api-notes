import GetNoteById from "../src/application/usecases/GetNoteById.";
import repository from "../src/infra/repositories/InMemoryRepository";

test("should get a note by ID", async () => {
  const usecase = new GetNoteById(repository);
  const note = await usecase.execute(1);
  expect(note?.id).toBe(1);
  expect(note?.title).toBe("Nota");
});
test("should get a note width correct date", async () => {
  const usecase = new GetNoteById(repository);
  const note = await usecase.execute(1);
  expect(note?.id).toBe(1);
  expect(note?.date?.getTime()).toBe(
    new Date("2024-10-23T17:48:30.044Z").getTime()
  );
});
