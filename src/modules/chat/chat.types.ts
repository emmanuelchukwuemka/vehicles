import { RowDataPacket } from "mysql2";

export interface ChatRow extends RowDataPacket {
  id: number;
  store_id: number;
  store_name?: string;
  logo?: string;
  sender_id: number;
  receiver_id: number;
  sender_type: string;
  receiver_type: string;
  message: string;
  created_at: string;
  status: number;
  is_product: number;
  unreadCount?: number;
  attachments: [];
}

export interface ChatPreview extends RowDataPacket {
  partner_id: number;
  partner_name: string;
  partner_avatar: string | null;

  //last message fields
  id: number; // chat_table.id
  sender_id: number;
  receiver_id: number;
  sender_type: "user" | "store";
  receiver_type: "user" | "store";
  message: string;
  created_at: string;
  status: number;
  is_product: number;

  unreadCount: number;
}

export interface UnreadCount extends RowDataPacket {
  store_id: number;
  unreadCount: number;
}
