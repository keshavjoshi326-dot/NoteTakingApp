import express from "express";
import {createNoteSchema, updateNoteSchema} from "./validation.ts";
import {validate} from "./middleware.ts";
import * as noteStore from "./noteStore.ts";

const app=express();

app.use(express.json());

app.get("/notes", (req, res)=>{
  res.json(noteStore.getAll());
})

app.get("/notes/:id", (req, res)=>{
  const result = noteStore.getById(Number(req.params.id));
  if(!result) {return res.status(404).json({message: "Invalid Id"})};
  return res.json(result);
})

app.post("/notes", validate(createNoteSchema), (req, res)=>{
  const createdNote = noteStore.create(req.validatedBody);
  res.status(201).json(createdNote);
})

app.put("/notes/:id", validate(updateNoteSchema), (req, res)=>{
  const result = noteStore.update(Number(req.params.id), req.validatedBody);
  if(!result) {return res.status(404).json({message: "Invalid Id"})};
  return res.json(result);
})

app.delete("/notes/:id", (req, res)=>{
  const result = noteStore.deleteNote(Number(req.params.id));
  if(!result) {return res.status(404).json({message: "Invalid Id"})};
  return res.json(result);
})

export default app;
