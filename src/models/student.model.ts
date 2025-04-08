import mongoose from "mongoose";
import { IStudent } from "../intefaces/IStudent.interface";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  place: {
    type: String,
    required: true,
  }
});

const studentModel = mongoose.model<IStudent>("students", studentSchema);
export default studentModel;
