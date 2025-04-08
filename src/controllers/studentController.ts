import { IStudent } from "../intefaces/IStudent.interface";
import { Request, Response } from "express";
import { IStudentService } from "../service/iStudent.Service";

export class StudentController {
  private studentService: IStudentService;

  constructor(studentService: IStudentService) {
    this.studentService = studentService;
  }

  async createStudent(req: Request, res: Response) {
    try {
      const student: IStudent = req.body;
      const newStudent = await this.studentService.createStudent(student);
      res
        .status(201)
        .json({ success: true, message: "Student created!", newStudent });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        res.status(400).json({ success: false, message: error.message });
      }
    }
  }

  async updateStudent(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const student: Partial<IStudent> = req.body;
      const updatedStudent = await this.studentService.updateStudent(
        id,
        student
      );

      if (!updatedStudent) {
        res.status(404).json({ success: false, message: "Student not found" });
        return;
      }

      res
        .status(200)
        .json({ success: true, message: "Student updated!", updatedStudent });
    } catch (error) {
      console.error("Error updating student:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while updating the student",
      });
    }
  }

  async findAllStudents(req: Request, res: Response) {
    try {
      const students = await this.studentService.findAllStudents();
      res.json(students);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }

  async findStudentByName(req: Request, res: Response) {
    try {
      const name = req.params.name;
      const student = await this.studentService.findStudentByName(name);
      if (!student) {
        res.status(404).json({ message: "Student not found" });
        return;
      }
      res.json(student);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }

  async findStudentById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const student = await this.studentService.findStudentById(id);
      if (!student) {
        res.status(404).json({ message: "Student not found" });
      } else {
        res.json(student);
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }

  async deleteStudent(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const student = await this.studentService.deleteStudent(id);
      if (!student) {
        res.status(404).json({ message: "Student not found" });
        return;
      }
      res.json(student);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }
}
