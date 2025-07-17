export interface SendMessagePayload {
  sender_id: number;
  receiver_id: number;
  is_product: boolean;
  message: string | object;
}
