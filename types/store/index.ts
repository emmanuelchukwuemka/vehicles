import { RowDataPacket } from "mysql2";

export interface Store extends RowDataPacket {
  id: number;
  name: string;
  logo: string | null;
  email?: string;
  phone?: string;
}
