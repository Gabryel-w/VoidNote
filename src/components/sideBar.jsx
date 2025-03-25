import { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText, IconButton } from "@mui/material";
import { Menu, Add } from "@mui/icons-material";

const Sidebar = ({ notes, onSelectNote, onAddNote }) => {
  const [open, setOpen] = useState(true);

  return (
    <Drawer variant="permanent" open={open} className="">
      <div className="p-4 flex justify-between items-center bg-gray-900 text-white border-b border-gray-700">
        <h2 className="text-lg font-bold">VoidNote</h2>
        <IconButton onClick={() => setOpen(!open)} className="text-white">
          <Menu />
        </IconButton>
      </div>

      <List className="bg-gray-800 text-white h-full">
        {notes.map((note) => (
          <ListItem key={note.id} disablePadding>
            <ListItemButton onClick={() => onSelectNote(note.id)} className="hover:bg-gray-700">
              <ListItemText primary={note.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <div className="p-4 flex justify-center">
        <IconButton onClick={onAddNote} className="text-white bg-blue-600 hover:bg-blue-700 p-4 rounded-full">
          <Add fontSize="large" />
        </IconButton>
      </div>
    </Drawer>
  );
};

export default Sidebar;