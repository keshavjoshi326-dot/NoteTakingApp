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

export function create(data): void {
  const note : Note = {
    id: nextId,
    title: data.title ?? "",
    content: data.content ?? "",
  }

  nextId++;
  notes.push(note);
}

export function getAll(): Readonly<Note>[] {
  return [...notes];
}

export function getById(id: number): Readonly<Note> | undefined {
  const index = findIndexById(id);
  return index < 0 ? undefined : notes[index];
}

export function update(id: number, data: Partial<Omit<Note, "id">>): Note | undefined {
  const i = findIndexById(id);
  if(i<0){return undefined};

  if(data.title !== undefined) {
    notes[i].title=data.title;
  }
  if(data.content !== undefined) {
    notes[i].content=data.content;
  }

  return notes[i]
}
