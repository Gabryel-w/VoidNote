import { useState, useEffect, useRef } from "react";
import Toolbar from "./toolBar";

const NoteEditor = ({ selectedNote, onUpdateNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const contentRef = useRef(null);
  const lastNoteIdRef = useRef(null); // Para rastrear a última nota selecionada

  useEffect(() => {
    if (selectedNote) {
      // Só atualiza o conteúdo se a nota selecionada for diferente da última
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
    const newTitle = e.target.value;
    setTitle(newTitle);
    onUpdateNote(selectedNote.id, newTitle, content);
  };

  const handleContentChange = () => {
    if (!contentRef.current) return;
    const newText = contentRef.current.innerHTML;
    setContent(newText);
    onUpdateNote(selectedNote.id, title, newText);
  };

  const applyStyle = (e, command, value = null) => {
    e.preventDefault();
    document.execCommand(command, false, value);
    handleContentChange();
  };

  if (!selectedNote) {
    return <div className="p-6 text-gray-400">Selecione uma nota para editar</div>;
  }

  return (
    <div className="flex-1 p-6">
      <input
        type="text"
        className="w-full text-2xl font-semibold bg-gray-900 text-white border-none focus:outline-none p-2"
        value={title}
        onChange={handleTitleChange}
        placeholder="Título da Nota"
      />

      <Toolbar applyStyle={applyStyle} />

      <div
        ref={contentRef}
        className="w-full h-full p-4 text-white bg-gray-900 border-none resize-none focus:outline-none mt-4"
        contentEditable
        onInput={handleContentChange}
        placeholder="Escreva sua nota aqui..."
      />
    </div>
  );
};

export default NoteEditor;