import { Iadmin } from "../intefaces/iadmin.interface";

export interface IAdminService {
  verifyAdmin(
    userName: string,
    password: string
  ): Promise<{ verified: boolean; admin?: Iadmin }>;
}
