import express from "express";
import {createNoteSchema, updateNoteSchema} from "./validation.ts"

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

app.post("/notes", (req, res)=>{
  const result = createNoteSchema.safeParse(req.body);
  if(!result.success){
    return res.status(400).json({message: result.error.issues[0].message});
  }
  const note = {
    id: nextId,
    title: result.data.title,
    content: result.data.content
  }
  nextId++;
  notes.push(note);
  res.status(201).json(note)
})

app.put("/notes/:id", (req, res)=>{
  const result = updateNoteSchema.safeParse(req.body);

  if(!result.success){
    return res.status(400).json({message: result.error.issues[0].message});
  }

  const i = findIndexById(Number(req.params.id));

  if(i<0){return res.status(404).json({message: "Invalid Id."})}

  if(result.data.title !== undefined) {
    notes[i].title=result.data.title;
  }
  if(result.data.content !== undefined) {
    notes[i].content=result.data.content;
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
