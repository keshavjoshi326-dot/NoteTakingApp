import express from "express";
import zod from "zod";

const app=express();

app.use(express.json());

interface Note {
  id:  number;
  title: string;
  content: string;
}

const noteSchema = z.object({
  title: z.string(),
  content: z.string()
})

const notes : Note[] = [];
let nextId : number = 1;

app.get("/notes", (req, res)=>{
  res.json(notes);
})

app.get("/notes/:id", (req, res)=>{
  for(let i = 0; i<notes.length; i++) {
    if(notes[i].id===Number(req.params.id)) {
      return res.json(notes[i]);
    }
  }
  return res.status(404).json({msg: "Invalid Id."})
})

app.post("/notes", (req, res)=>{
  const result = noteSchema.safeParse(req.body);
  if(!result.success){
    return res.status(400).json({msg: "Wrong input format."})
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
  for(let i = 0; i<notes.length; i++) {
    if(notes[i].id===Number(req.params.id)) {
      notes[i].title=req.body.title;
      notes[i].content=req.body.content;
      return res.json(notes[i]);
    }
  }
  res.status(404).json({msg: "Invalid Id."})
})

app.delete("/notes/:id", (req, res)=>{
  for(let i = 0; i<notes.length; i++) {
    if(notes[i].id===Number(req.params.id)) {
      notes.splice(i, 1);
      return res.json({msg: "Note succesfully deleted."})
    }
  }
  res.status(404).json({msg: "Invalid Id."})
})

export default app;
