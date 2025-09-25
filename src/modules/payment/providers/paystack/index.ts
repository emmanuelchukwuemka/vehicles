import axios from "axios";
import { SubmitPinInput } from "../../validations/pin";
import { SubmitOtpInput } from "../../validations/otp";
import { ChargeAuthInput } from "../../validations/charge_auth";
import { PaystackChargeInput } from "../../validations";
import { SubmitPhoneInput } from "../../validations/phone";
import { SubmitBirthdayInput } from "../../validations/dob";
import { SubmitAddressInput } from "../../validations/address";

export class PaystackService {
  static async processPayment(input: any) {
    const { stage, mode } = input;

    const secretKey =
      mode === "test"
        ? process.env.PAYSTACK_TEST_SECRET_KEY
        : process.env.PAYSTACK_SECRET_KEY;

    try {
      let response;

      switch (stage) {
        case "initialize":
          response = await axios.post(
            "https://api.paystack.co/charge",
            {
              card: {
                number: input.card_number,
                cvv: input.cvv,
                expiry_month: input.expiry_month,
                expiry_year: input.expiry_year,
              },
              email: input.email,
              currency: "NGN",
              channels: ["card"],
              amount: Number(input.amount) * 100,
              metadata: { cardholder_name: input.cardholder_name },
            },
            { headers: { Authorization: `Bearer ${secretKey}` } }
          );
          break;

        case "submit_pin":
          response = await axios.post(
            "https://api.paystack.co/charge/submit_pin",
            { reference: input.reference, pin: input.pin },
            { headers: { Authorization: `Bearer ${secretKey}` } }
          );
          break;

        case "submit_otp":
          response = await axios.post(
            "https://api.paystack.co/charge/submit_otp",
            { reference: input.reference, otp: input.otp },
            { headers: { Authorization: `Bearer ${secretKey}` } }
          );
          break;

        case "submit_phone":
          response = await axios.post(
            "https://api.paystack.co/charge/submit_phone",
            { reference: input.reference, phone: input.phone },
            { headers: { Authorization: `Bearer ${secretKey}` } }
          );
          break;

        case "submit_birthday":
          response = await axios.post(
            "https://api.paystack.co/charge/submit_birthday",
            { reference: input.reference, birthday: input.birthday }, // yyyy-mm-dd
            { headers: { Authorization: `Bearer ${secretKey}` } }
          );
          break;

        case "charge_authorization": // ✅ NEW
          response = await axios.post(
            "https://api.paystack.co/transaction/charge_authorization",
            {
              email: input.email,
              amount: Number(input.amount) * 100,
              authorization_code: input.auth_code,
            },
            { headers: { Authorization: `Bearer ${secretKey}` } }
          );
          break;

        case "verify":
          response = await axios.get(
            `https://api.paystack.co/transaction/verify/${input.reference}`,
            { headers: { Authorization: `Bearer ${secretKey}` } }
          );
          break;

        default:
          return { success: false, message: "Invalid payment stage." };
      }

      // now handle response
      const resData = response.data;

      if (!resData.status) {
        return { success: false, message: resData.message, data: resData };
      }

      const { status, reference, authorization_url, url } = resData.data || {};

      switch (status) {
        case "send_pin":
          return {
            success: true,
            message: "Please provide your card PIN.",
            data: { reference, status },
          };
        case "send_otp":
          return {
            success: true,
            message: "Please provide the OTP sent to your phone/email.",
            data: { reference, status },
          };
        case "send_phone":
          return {
            success: true,
            message: "Please provide your phone number.",
            data: { reference, status },
          };
        case "send_birthday":
          return {
            success: true,
            message: "Please provide your date of birth.",
            data: { reference, status },
          };
        case "open_url":
          return {
            success: true,
            message: "Redirect user to complete authentication.",
            data: { reference, status, url: authorization_url || url },
          };
        case "success":
          return {
            success: true,
            message: "Charge successful",
            data: { reference, status },
          };
        default:
          return {
            success: true,
            message: resData.message,
            data: resData.data,
          };
      }
    } catch (error: any) {
      console.error("Paystack Error:", error?.response?.data || error.message);
      return {
        success: false,
        message: error?.response?.data?.message || "Payment failed",
        error: error.message,
      };
    }
  }

  static async chargeAuthorization(data: ChargeAuthInput) {
    const { email, amount, auth_code, mode } = data;

    try {
      const secretkey =
        mode === "test"
          ? process.env.PAYSTACK_TEST_SECRET_KEY
          : process.env.PAYSTACK_SECRET_KEY;

      const response = await axios.post(
        "https://api.paystack.co/transaction/charge_authorization",
        {
          email,
          amount: Number(amount) * 100,
          authorization_code: auth_code,
        },
        {
          headers: {
            Authorization: `Bearer ${secretkey}`,
            "Content-Type": "application/json",
          },
          validateStatus: (status) => status >= 200 && status < 500,
        }
      );

      return {
        success: response.data.status ?? false,
        message: response.data.message || "No message from Paystack",
        data: response.data.data ?? null,
        statusCode: response.status,
      };
    } catch (error: any) {
      console.error("Paystack Charge Authorization Error:", error);

      return {
        success: false,
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Charge authorization failed",
        data: error?.response?.data ?? null,
        statusCode: error?.response?.status ?? 500,
      };
    }
  }
}
