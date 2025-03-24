import { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText, IconButton } from "@mui/material";
import { Menu, Add } from "@mui/icons-material";

const Sidebar = ({ notes, onSelectNote, onAddNote }) => {
  const [open, setOpen] = useState(true);

  return (
    <Drawer variant="permanent" open={open} className="w-64">
      {/* Botão de menu para colapsar a Sidebar */}
      <div className="p-4 flex justify-between items-center bg-gray-800 text-white">
        <h2 className="text-lg font-semibold">VoidNote</h2>
        <IconButton onClick={() => setOpen(!open)} className="text-white">
          <Menu />
        </IconButton>
      </div>

      {/* Lista de notas */}
      <List className="bg-gray-900 text-white h-full">
        {notes.map((note) => (
          <ListItem key={note.id} disablePadding>
            <ListItemButton onClick={() => onSelectNote(note.id)}>
              <ListItemText primary={note.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Botão para adicionar nova nota */}
      <div className="p-4">
        <IconButton onClick={onAddNote} className="w-full text-white bg-green-600 hover:bg-green-700">
          <Add />
        </IconButton>
      </div>
    </Drawer>
  );
};

export default Sidebar;
