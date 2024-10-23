import express from "express";
import GetNotes from "./application/usecases/GetNotes";
import respository from "./infra/repositories/InMemoryRepository";
import CreateNote from "./application/usecases/CreateNote";
import GetNoteById from "./application/usecases/GetNoteById.";
import NoteNotFoundError from "./domain/errors/NoteNotFoundError";
import UpdateNote from "./application/usecases/UpdateNote";
import DeleteNote from "./application/usecases/DeleteNote";
import { router } from "./interface_adapters/rotes/note-routes";

const app = express();

app.use(express.json());

app.use("/api", router);

app.listen(3000, () => {
  console.log("Running...");
});
