import { IAdminRepository } from "../repositories/iadminRepository";
import { Iadmin } from "../intefaces/iadmin.interface";

export class AdminRepository implements IAdminRepository {
  private admin: Iadmin = {
    userName: "admin",
    password: "admin12",
  };

  async verifyAdmin(admin: Iadmin): Promise<Iadmin | null> {
    if (
      admin.userName === this.admin.userName &&
      admin.password === this.admin.password
    ) {
      return this.admin;
    }
    return null;
  }
}
