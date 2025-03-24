import { useState, useEffect } from "react";

const NoteEditor = ({ selectedNote, onUpdateNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    }
  }, [selectedNote]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onUpdateNote(selectedNote.id, newTitle, content);
  };

  const handleContentChange = (e) => {
    const newText = e.target.value;
    setContent(newText);
    onUpdateNote(selectedNote.id, title, newText);
  };

  if (!selectedNote) {
    return <div className="p-6 text-gray-400">Selecione uma nota para editar</div>;
  }

  return (
    <div className="flex-1 p-6">
      {/* Campo de título editável */}
      <input
        type="text"
        className="w-full text-2xl font-semibold bg-gray-900 text-white border-none focus:outline-none p-2"
        value={title}
        onChange={handleTitleChange}
        placeholder="Título da Nota"
      />

      {/* Campo de texto para o conteúdo */}
      <textarea
        className="w-full h-full p-4 text-white bg-gray-900 border-none resize-none focus:outline-none mt-4"
        value={content}
        onChange={handleContentChange}
        placeholder="Escreva sua nota aqui..."
      />
    </div>
  );
};

export default NoteEditor;
