import { IStudent } from "../intefaces/IStudent.interface";

export interface IStudentService {
  createStudent(student: IStudent): Promise<IStudent>;
  updateStudent(id: string, student: Partial<IStudent>): Promise<IStudent | null>;
  findAllStudents(): Promise<IStudent[] | null>;
  findStudentByName(name: string): Promise<IStudent | null>;
  findStudentById(id: string): Promise<IStudent | null>;
  deleteStudent(id: string): Promise<IStudent | null>;
}
