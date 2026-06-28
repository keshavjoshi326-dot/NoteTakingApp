import express from "express";

const app=express();

app.use(express.json());

app.get("/", (req, res)=>{
  res.send("Hello from note taking API");
})

app.post("/notes", (req, res)=>{
  const data = req.body;
  console.log(data);
  res.json(data);
})

export default app;
