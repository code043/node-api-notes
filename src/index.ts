import express from "express";
import GetNotes from "./application/usecases/GetNotes";
import respository from "./infra/repositories/InMemoryRepository";
import CreateNote from "./application/usecases/CreateNote";
import GetNoteById from "./application/usecases/GetNoteById.";
import NoteNotFoundError from "./domain/errors/NoteNotFoundError";
import UpdateNote from "./application/usecases/UpdateNote";
import DeleteNote from "./application/usecases/DeleteNote";

const app = express();

app.use(express.json());

app.get("/notes", async (req, res) => {
  const getNotes = new GetNotes(respository);
  const notes = await getNotes.execute();
  res.status(200).json({
    quantity: notes.length,
    notes: notes,
  });
});
app.get("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const getNote = new GetNoteById(respository);
  try {
    const note = await getNote.execute(Number(id));
    if (!note?.id) throw new NoteNotFoundError(Number(id));
    res.status(200).json({
      id: note?.id,
      note: note,
    });
  } catch (error) {
    if (error instanceof NoteNotFoundError) {
      res.status(404).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "Internal Error",
      });
    }
  }
});
app.put("/notes/:id", async (req, res) => {
  const { id } = req.params;

  const updateNote = new UpdateNote(respository);
  try {
    await updateNote.execute(Number(id), req.body);
    res.status(200).json({
      message: "Note with ID " + id + " has updated",
    });
  } catch (error) {}
});
app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;

  const deleteNote = new DeleteNote(respository);
  try {
    await deleteNote.execute(Number(id));
    res.status(200).json({
      message: "Note with ID " + id + " has deleted",
    });
  } catch (error) {}
});

app.post("/notes", async (req, res) => {
  const createNote = new CreateNote(respository);
  await createNote.execute(req.body);
  res.status(201).json({
    message: "Note has created",
  });
});

app.listen(3000, () => {
  console.log("Running...");
});
