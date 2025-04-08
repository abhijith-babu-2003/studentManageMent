import express, { Application } from "express";
import { StudentController } from "./controllers/studentController";
import { StudentService } from "./service/studentService";
import { StudentRepository } from "./repositories/studentRepositoy";
import { StudentRoutes } from "./routes/routes";
import nocache from "nocache";
import session from "express-session";
import { AdminController } from ".//controllers/authController";
import { AdminRepository } from "./repositories/adminRepository";
import { AdminService } from "./service/adminService";

export class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.setMiddlewares();
    this.setTestRoute();
    this.setStudentRoute();
  }

  private setMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      session({
        secret: "secret-key-is-here",
        resave: false,
        saveUninitialized: true,
      })
    );

    this.app.use(nocache());
  }

  private setTestRoute() {
    this.app.get("/", (req, res) => {
      res.json({ message: "Server is up" });
    });
  }

  private setStudentRoute() {
    const studentController = this.injectStudent();
    const adminController = this.injectAdmin();
    const studentRouter = new StudentRoutes(studentController, adminController);
    this.app.use("/", studentRouter.getRoutes());
  }

  private injectStudent(): StudentController {
    const studentRepository = new StudentRepository();
    const studentService = new StudentService(studentRepository);
    return new StudentController(studentService);
  }

  private injectAdmin(): AdminController {
    const adminRepository = new AdminRepository();
    const adminService = new AdminService(adminRepository);
    return new AdminController(adminService);
  }

  public getApp() {
    return this.app;
  }
}

  
