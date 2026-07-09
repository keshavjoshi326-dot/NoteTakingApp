import express from "express";
import {createNoteSchema, updateNoteSchema} from "./validation.ts";
import {validate} from "./middleware.ts";

const app=express();

app.use(express.json());

interface Note {
  id:  number;
  title: string;
  content: string;
}

const notes : Note[] = [];
let nextId : number = 1;

function findIndexById(id: number): number {
  for(let i=0; i<notes.length; i++) {
    if(notes[i].id===Number(id)) {
      return i;
    }
  }
  return -1;
}

app.get("/notes", (req, res)=>{
  res.json(notes);
})

app.get("/notes/:id", (req, res)=>{
  const i = findIndexById(Number(req.params.id));
  if(i<0) {return res.status(404).json({message: "Invalid Id."})};
  return res.json(notes[i]);
})

app.post("/notes", validate(createNoteSchema), (req, res)=>{
  const note : Note = {
    id: nextId,
    title: req.validatedBody.title ?? "",
    content: req.validatedBody.content ?? "",
  }

  nextId++;
  notes.push(note);
  res.status(201).json(note)
})

app.put("/notes/:id", validate(updateNoteSchema), (req, res)=>{
  const i = findIndexById(Number(req.params.id));

  if(i<0){return res.status(404).json({message: "Invalid Id."})}

  if(req.validatedBody.title !== undefined) {
    notes[i].title=req.validatedBody.title;
  }
  if(req.validatedBody.content !== undefined) {
    notes[i].content=req.validatedBody.content;
  }

  return res.json(notes[i]);
})

app.delete("/notes/:id", (req, res)=>{
  const i = findIndexById(Number(req.params.id));
  if(i<0){return res.status(404).json({message: "Invalid Id."})}
  notes.splice(i, 1);
  return res.json({message: "Note succesfully deleted."})
})

export default app;
