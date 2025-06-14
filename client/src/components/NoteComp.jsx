/* eslint-disable no-unused-vars */
import React from "react";
import "../styles/style.css";
import { axiosInstance } from "../services/services.js";
const ChildC = ({ initialValue = "", noteId }) => {
  const [edit, setEdit] = React.useState(false);
  const [text, setText] = React.useState(initialValue); // ✅ اسم أوضح
  const [inputValue, setInputValue] = React.useState(initialValue);
  const toggleEdit = () => {
    if (!edit) {
      // أنت الآن تدخل وضع التعديل، فقم بمزامنة القيمة
      setInputValue(text);
      setEdit(true);
    } else {
      setEdit(false);
    }
  };
  const deleteToggle = async () => {
    try {
      const resp = await axiosInstance.delete(`/notes/${noteId}`);
    } catch (err) {
      console.log("Delete Error", err);
    }
  };

  const handleSave = async () => {
    if (inputValue.trim() === text.trim()) {
      setEdit(false);
      return;
    }
    try {
      const response = await axiosInstance.put(`/notes/${noteId}`, {
        content: inputValue,
      });
      setText(inputValue);

      console.log(noteId);
      setEdit(false);
    } catch (err) {
      console.log("the err", err);
    }
  };
  return (
    <li value={text} className="child-item">
      <div>
        <span>{text}</span>
        <button onClick={toggleEdit}>{edit ? "cancel" : "edit"}</button>
        <button>Delete</button>
        {edit && (
          <div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        )}
      </div>
    </li>
  );
};
export default ChildC;
 