export interface SuspendVendorInput {
  vendorId: number;
  status: 0 | 1; // 0 = suspend, 1 = activate
}
