import { Bold, Italic, Underline, Type, ChevronDown } from "lucide-react";
import { useState } from "react";

const Toolbar = ({ applyStyle }) => {
  const [showHeadingDropdown, setShowHeadingDropdown] = useState(false);

  const handleHeadingSelect = (e, tag) => {
    e.preventDefault();
    applyStyle(e, "formatBlock", tag); // Usamos applyStyle em vez de document.execCommand diretamente
    setShowHeadingDropdown(false);
  };

  return (
    <div className="flex space-x-2 mt-4 bg-gray-800 p-2 rounded relative">
      <button onMouseDown={(e) => applyStyle(e, "bold")} className="text-white p-2">
        <Bold size={18} />
      </button>
      <button onMouseDown={(e) => applyStyle(e, "italic")} className="text-white p-2">
        <Italic size={18} />
      </button>
      <button onMouseDown={(e) => applyStyle(e, "underline")} className="text-white p-2">
        <Underline size={18} />
      </button>
      
      {/* Dropdown de títulos */}
      <div className="relative">
        <button 
          onMouseDown={(e) => {
            e.preventDefault();
            setShowHeadingDropdown(!showHeadingDropdown);
          }} 
          className="text-white p-2 flex items-center"
        >
          <Type size={18} />
          <ChevronDown size={14} className="ml-1" />
        </button>
        
        {showHeadingDropdown && (
          <div className="absolute left-0 mt-2 w-40 bg-gray-700 rounded shadow-lg z-10">
            <button 
              onMouseDown={(e) => handleHeadingSelect(e, "h1")} 
              className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600"
            >
              Título 1
            </button>
            <button 
              onMouseDown={(e) => handleHeadingSelect(e, "h2")} 
              className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600"
            >
              Título 2
            </button>
            <button 
              onMouseDown={(e) => handleHeadingSelect(e, "h3")} 
              className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600"
            >
              Título 3
            </button>
            <button 
              onMouseDown={(e) => handleHeadingSelect(e, "p")} 
              className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600"
            >
              Parágrafo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;