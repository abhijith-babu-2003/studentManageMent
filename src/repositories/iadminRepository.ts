import { Iadmin } from "../intefaces/iadmin.interface";

export interface IAdminRepository {
  verifyAdmin(admin: Iadmin): Promise<Iadmin | null>;
}
