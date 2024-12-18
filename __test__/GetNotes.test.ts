import GetNotes from "../src/application/usecases/note/GetNotes";
import repository from "../src/infra/repositories/in-memory/note/InMemoryRepository";

test("should get all notes", async () => {
  console.log(repository);
  const usecase = new GetNotes(repository);
  const notes = await usecase.execute();
  expect(notes.length).toBeGreaterThan(0);
  expect(notes[0].title).toBe("Note");
});
