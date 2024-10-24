import CreateNote from "../src/application/usecases/CreateNote";
import GetNotes from "../src/application/usecases/GetNotes";
import repository from "../src/infra/repositories/InMemoryRepository";
import prismaRepository from "../src/infra/repositories/PrismaRepository";

const mockDate = new Date("2024-10-23T17:48:30.044Z");
global.Date = jest.fn(() => mockDate) as any;

test("should create a note", async () => {
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
test("should create a note with prisma", async () => {
  const create = new CreateNote(prismaRepository);
  const get = new GetNotes(prismaRepository);
  const input = {
    title: "Nota 2",
    body: "Anotado...",
  };
  await create.execute(input);
  const notes = await get.execute();
  expect(notes[1].id).toBeDefined();
  expect(notes[1].title).toBe("Nota 2");
});
test("should create a note with correct date", async () => {
  const create = new CreateNote(repository);
  const get = new GetNotes(repository);
  const input = {
    title: "Nota 2",
    body: "Anotado...",
  };
  await create.execute(input);
  const notes = await get.execute();
  expect(notes[1].id).toBeDefined();
  expect(notes[1].date).toEqual(mockDate);
});
