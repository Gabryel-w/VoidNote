import './App.css';
import { useState } from "react";
import Sidebar from './components/sideBar';

function App() {
  const [notes, setNotes] = useState([
    { id: 1, title: "Primeira Nota" },
    { id: 2, title: "Segunda Nota" },
  ]);

  const handleAddNote = () => {
    const newNote = { id: Date.now(), title: "Nova Nota" };
    setNotes([...notes, newNote]);
  };

  const handleSelectNote = (id) => {
    console.log("Nota selecionada:", id);
  };

  return (
    <div className="flex">
      <Sidebar notes={notes} onSelectNote={handleSelectNote} onAddNote={handleAddNote} />
      <div className="flex-1 p-6">Conteúdo da nota aqui</div>
    </div>
  );
}

export default App;
