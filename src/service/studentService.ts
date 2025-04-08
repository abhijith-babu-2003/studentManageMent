import { IStudent } from "../intefaces/IStudent.interface";
import { IStudentRepository } from "../repositories/istudentRepository";
import { IStudentService } from "./iStudent.Service";

export class StudentService implements IStudentService {
  private studentRepository: IStudentRepository;

  constructor(studentRepository: IStudentRepository) {
    this.studentRepository = studentRepository;
  }

  async createStudent(student: IStudent): Promise<IStudent> {
    const isExist = await this.studentRepository.findByName(student.name);

    if (isExist) {
      throw new Error("Student already exists");
    }

    return await this.studentRepository.createStudent(student);
  }

  async updateStudent(
    id: string,
    student: Partial<IStudent>
  ): Promise<IStudent | null> {
    const updatedStudent = await this.studentRepository.updateStudent(id, student);
    if (!updatedStudent) {
      return null;
    }
    return updatedStudent;
  }

  async findAllStudents(): Promise<IStudent[] | null> {
    return await this.studentRepository.findAllStudents();
  }

  async findStudentByName(name: string): Promise<IStudent | null> {
    return await this.studentRepository.findByName(name);
  }

  async findStudentById(id: string): Promise<IStudent | null> {
    return await this.studentRepository.getById(id);
  }

  async deleteStudent(id: string): Promise<IStudent | null> {
    return await this.studentRepository.deleteStudent(id);
  }
}
