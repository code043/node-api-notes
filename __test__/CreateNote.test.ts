import CreateNote from "../src/application/usecases/CreateNote";
import GetNotes from "../src/application/usecases/GetNotes";
import repository from "../src/infra/repositories/InMemoryRepository";

test("Creating a note", async () => {
  const create = new CreateNote(repository);
  const get = new GetNotes(repository);
  const input = {
    title: "Nota 2",
    body: "Anotado...",
  };
  await create.execute(input);
  const notes = await get.execute();
  expect(notes[1].id).toBeDefined();
  expect(notes[1].title).toBe("Nota 2");
});
