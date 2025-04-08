import express, { Request, Response } from "express";
import { StudentController } from "../controllers/studentController";
import { AdminController } from "../controllers/authController";
import { authMiddleware } from "../middleware/auth";

export class StudentRoutes {
  private studentController: StudentController;
  private adminController: AdminController;
  private router = express.Router();

  constructor(
    studentController: StudentController,
    adminController: AdminController
  ) {
    this.studentController = studentController;
    this.adminController = adminController;
    this.router = express.Router();
    this.setRoutes();
  }

  private setRoutes() {
    // Admin Routes
    this.router.post("/login", (req: Request, res: Response) =>
      this.adminController.verifyAdmin(req, res)
    );
    this.router.get("/logout", (req: Request, res: Response) =>
      this.adminController.logOut(req, res)
    );

    // Student Routes
    this.router.post("/create-student", authMiddleware, (req: Request, res: Response) =>
      this.studentController.createStudent(req, res)
    );
    this.router.get("/student/:id", authMiddleware, (req: Request, res: Response) =>
      this.studentController.findStudentById(req, res)
    );
    this.router.put("/student/:id", authMiddleware, (req: Request, res: Response) =>
      this.studentController.updateStudent(req, res)
    );
    this.router.get("/students", authMiddleware, (req: Request, res: Response) =>
      this.studentController.findAllStudents(req, res)
    );
    this.router.delete("/student/:id", authMiddleware, (req: Request, res: Response) =>
      this.studentController.deleteStudent(req, res)
    );
  }

  public getRoutes() {
    return this.router;
  }
}
