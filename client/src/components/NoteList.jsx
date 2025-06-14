import { useEffect, useState } from "react";
import ChildC from "./NoteComp.jsx";
import { axiosInstance } from "../services/services.js";
// eslint-disable-next-line no-unused-vars
const ParentList = ({ userId, onDelete }) => {
  const [items, setItems] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axiosInstance.get(`/notes/${userId}`);
        setItems(res.data);
      } catch (err) {
        console.log("Error fetching notes", err);
      }
    };
    if (userId) {
      fetchNotes();
    }
  }, [userId]);
  const handleAddClick = () => {
    setShowInput(true);
    setNewItem("");
  };

  const handleSaveNewItem = async () => {
    if (newItem.trim() === "") return;
    try {
      const response = await axiosInstance.post("/notes/create/", {
        content: newItem,
        user: userId,
      });
      console.log(newItem, userId);
      if (!response.data) {
        // Check response.data instead of just response
        console.error("Something went wrong");
        return;
      }
      // console.log(response);
      setItems((prevItems) => {
        [...prevItems, response.data];
        // console.log(response);
      });

      setNewItem("");
      setShowInput(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteNote = () => {
    // eslint-disable-next-line no-undef
    setItems((prevItems) => prevItems.filter((note) => note._id !== _id));
  };
  return (
    <div className="parent-list">
      <button onClick={handleAddClick}>Add new</button>

      {showInput && (
        <div>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button onClick={handleSaveNewItem}>Save</button>
        </div>
      )}

      <ul>
        {items.map((note) => (
          <ChildC
            key={note._id}
            initialValue={note.content}
            noteId={note._id}
            onDelete={handleDeleteNote}
          />
        ))}
      </ul>
    </div>
  );
};
export default ParentList;
