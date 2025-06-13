import mongoose from "mongoose";
import dayjs from "dayjs";
const noteSchema = new mongoose.Schema(
  {
    content: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

noteSchema.pre("save", function (next) {
  this.updatedAt = dayjs();
  next();
});
const Note = mongoose.model("Note", noteSchema);
export default Note;
