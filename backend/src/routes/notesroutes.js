import express from "express"

const router = express.Router();

import {getAllNotes,
        getNoteById,
        CreateNotes,
        UpdateNotes,
        DeleteNotes
} from "../controllers/notesController.js";

router.get("/",getAllNotes)
router.get("/:id",getNoteById)
router.post("/",CreateNotes)
router.put("/:id",UpdateNotes )
router.delete("/:id", DeleteNotes)

export default router