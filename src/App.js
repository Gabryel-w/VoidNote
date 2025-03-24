import { useState } from "react";
import Sidebar from "./components/sideBar";
import NoteEditor from "./components/noteEditor";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([
 
  ]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const handleAddNote = () => {
    const newNote = { id: Date.now(), title: "Nova Nota", content: "" };
    setNotes([...notes, newNote]);
    setSelectedNoteId(newNote.id);
  };

  const handleSelectNote = (id) => {
    setSelectedNoteId(id);
  };

  const handleUpdateNote = (id, newTitle, newContent) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, title: newTitle, content: newContent } : note
      )
    );
  };

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  return (
    <div className="flex h-screen">
      <Sidebar notes={notes} onSelectNote={handleSelectNote} onAddNote={handleAddNote} />
      <NoteEditor selectedNote={selectedNote} onUpdateNote={handleUpdateNote} />
    </div>
  );
}

export default App;