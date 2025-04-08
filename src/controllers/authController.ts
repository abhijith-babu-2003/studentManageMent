import { Request, Response } from "express";
import { IAdminService } from "../service/iAdmin.service";
import { Iadmin } from "../intefaces/iadmin.interface";
import { CLIENT_RENEG_LIMIT } from "tls";
import { log } from "console";

export class AdminController {
  private adminService: IAdminService;

  constructor(adminService: IAdminService) {
    this.adminService = adminService;
  }


  async verifyAdmin(req: any, res: any): Promise<void> {
    try {
      const { userName, password } = req.body;
      

      const result = await this.adminService.verifyAdmin(userName, password);

      if (result.verified) {
        req.session.verified = result.verified;
        res.status(200).json({ success: true, message: "Admin verified" });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(400).json({ success: false, message: error.message });
      }
    }
  }


  async logOut(req: any, res: any): Promise<void> {
    try {
      req.session.verified = false;
      res.status(200).json({ success: true, message: "Logout successfully" });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(400).json({ success: false, message: error.message });
      }
    }
  }
}
