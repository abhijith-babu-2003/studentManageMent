import { IStudent } from "../intefaces/IStudent.interface";

export interface IStudentRepository {
  createStudent(student: IStudent): Promise<IStudent>;
  updateStudent(id: string, student: Partial<IStudent>): Promise<IStudent | null>;
  findAllStudents(): Promise<IStudent[] | null>;
  findByName(name: string): Promise<IStudent | null>;
  getById(id: string): Promise<IStudent | null>;
  deleteStudent(id: string): Promise<IStudent | null>;
}
