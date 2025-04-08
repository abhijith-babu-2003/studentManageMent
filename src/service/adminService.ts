import { Iadmin } from "../intefaces/iadmin.interface";
import { IAdminService } from "./iAdmin.service";
import { IAdminRepository } from "../repositories/iadminRepository";

export class AdminService implements IAdminService {
  private adminRepository: IAdminRepository;

  constructor(adminRepository: IAdminRepository) {
    this.adminRepository = adminRepository;
  }

  async verifyAdmin(
    userName: string,
    password: string
  ): Promise<{ verified: boolean; admin?: Iadmin }> {
    const admin: Iadmin | null = await this.adminRepository.verifyAdmin({
      userName,
      password,
    });

    if (admin) {
      return { verified: true, admin };
    }

    return { verified: false };
  }
}
