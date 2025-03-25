import { Bold, Italic, Underline, Type, ChevronDown } from "lucide-react";
import { useState } from "react";

const Toolbar = ({ applyStyle }) => {
  const [showHeadingDropdown, setShowHeadingDropdown] = useState(false);

  return (
    <div className="flex space-x-3 mt-4 bg-gray-900 p-3 rounded-lg border border-gray-700 shadow-lg">
      <button onMouseDown={(e) => applyStyle(e, "bold")} className="text-white p-2 hover:bg-gray-700 rounded">
        <Bold size={20} />
      </button>
      <button onMouseDown={(e) => applyStyle(e, "italic")} className="text-white p-2 hover:bg-gray-700 rounded">
        <Italic size={20} />
      </button>
      <button onMouseDown={(e) => applyStyle(e, "underline")} className="text-white p-2 hover:bg-gray-700 rounded">
        <Underline size={20} />
      </button>

      <div className="relative">
        <button onMouseDown={(e) => {
          e.preventDefault();
          setShowHeadingDropdown(!showHeadingDropdown);
        }} className="text-white p-2 flex items-center hover:bg-gray-700 rounded">
          <Type size={20} />
          <ChevronDown size={14} className="ml-1" />
        </button>

        {showHeadingDropdown && (
          <div className="absolute left-0 mt-2 w-40 bg-gray-800 rounded shadow-lg border border-gray-700 z-10">
            {['h1', 'h2', 'h3', 'p'].map((tag, index) => (
              <button key={index} onMouseDown={(e) => {
                e.preventDefault();
                applyStyle(e, "formatBlock", tag);
                setShowHeadingDropdown(false);
              }} className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700">
                {tag.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
