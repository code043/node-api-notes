"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GetNotes_1 = __importDefault(require("./application/usecases/GetNotes"));
const InMemoryRepository_1 = __importDefault(require("./infra/repositories/InMemoryRepository"));
const CreateNote_1 = __importDefault(require("./application/usecases/CreateNote"));
const GetNoteById_1 = __importDefault(require("./application/usecases/GetNoteById."));
const NoteNotFoundError_1 = __importDefault(require("./domain/errors/NoteNotFoundError"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/notes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getNotes = new GetNotes_1.default(InMemoryRepository_1.default);
    const notes = yield getNotes.execute();
    res.status(200).json({
        quantity: notes.length,
        notes: notes,
    });
}));
app.get("/notes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const getNote = new GetNoteById_1.default(InMemoryRepository_1.default);
    try {
        const note = yield getNote.execute(Number(id));
        if (!(note === null || note === void 0 ? void 0 : note.id))
            throw new NoteNotFoundError_1.default(Number(id));
        res.status(200).json({
            id: note === null || note === void 0 ? void 0 : note.id,
            note: note,
        });
    }
    catch (error) {
        if (error instanceof NoteNotFoundError_1.default) {
            res.status(404).json({
                message: error.message,
            });
        }
        else {
            res.status(500).json({
                message: "Erro interno",
            });
        }
    }
}));
app.post("/notes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createNote = new CreateNote_1.default(InMemoryRepository_1.default);
    yield createNote.execute(req.body);
    res.status(201).json({
        message: "Note has created",
    });
}));
app.listen(3000, () => {
    console.log("Running...");
});
