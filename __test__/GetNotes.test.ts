import GetNotes from "../src/application/usecases/GetNotes";
import repository from "../src/infra/repositories/InMemoryRepository";

test("should get all notes", async () => {
  console.log(repository);
  const usecase = new GetNotes(repository);
  const notes = await usecase.execute();
  expect(notes.length).toBeGreaterThan(0);
  expect(notes[0].title).toBe("Note");
});
