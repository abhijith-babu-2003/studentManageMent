import { IStudent } from "../intefaces/IStudent.interface";
import { IStudentRepository } from "../repositories/istudentRepository";
import studentModel from "../models/student.model";

export class StudentRepository implements IStudentRepository {
  async createStudent(student: IStudent): Promise<IStudent> {
    return await studentModel.create(student);
  }

  async updateStudent(
    id: string,
    student: Partial<IStudent>
  ): Promise<IStudent | null> {
    return await studentModel.findByIdAndUpdate(id, student, { new: true });
  }

  async findAllStudents(): Promise<IStudent[] | null> {
    return await studentModel.find();
  }

  async findByName(name: string): Promise<IStudent | null> {
    return await studentModel.findOne({ name });
  }

  async getById(id: string): Promise<IStudent | null> {
    return await studentModel.findById(id);
  }

  async deleteStudent(id: string): Promise<IStudent | null> {
    return await studentModel.findByIdAndDelete(id);
  }
}
