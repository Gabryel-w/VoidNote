import { useState, useEffect, useRef } from "react";
import Toolbar from "./toolBar";

const NoteEditor = ({ selectedNote, onUpdateNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const contentRef = useRef(null);
  const lastNoteIdRef = useRef(null);

  useEffect(() => {
    if (selectedNote) {
      if (selectedNote.id !== lastNoteIdRef.current) {
        setTitle(selectedNote.title);
        setContent(selectedNote.content);
        if (contentRef.current) {
          contentRef.current.innerHTML = selectedNote.content;
        }
        lastNoteIdRef.current = selectedNote.id;
      }
    } else {
      setTitle("");
      setContent("");
      if (contentRef.current) {
        contentRef.current.innerHTML = "";
      }
      lastNoteIdRef.current = null;
    }
  }, [selectedNote]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    onUpdateNote(selectedNote.id, e.target.value, content);
  };

  const handleContentChange = () => {
    if (!contentRef.current) return;
    const newText = contentRef.current.innerHTML;
    setContent(newText);
    onUpdateNote(selectedNote.id, title, newText);
  };

  if (!selectedNote) {
    return <div className="p-6 text-gray-400 text-center">Selecione uma nota para editar</div>;
  }

  return (
    <div className="flex flex-col h-screen w-screen pl-64 bg-gray-900 text-white">
      <div className="p-6 border-b border-gray-700">
        <input
          type="text"
          className="w-full text-2xl font-bold bg-transparent border-b border-gray-700 focus:outline-none p-2"
          value={title}
          onChange={handleTitleChange}
          placeholder="Título da Nota"
        />
      </div>
      <Toolbar applyStyle={(e, command, value) => {
        e.preventDefault();
        document.execCommand(command, false, value);
        handleContentChange();
      }} />
      <div
        ref={contentRef}
        className="flex-1 p-6 text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none overflow-auto"
        contentEditable
        onInput={handleContentChange}
        placeholder="Escreva sua nota aqui..."
      />
    </div>
  );
};

export default NoteEditor;
