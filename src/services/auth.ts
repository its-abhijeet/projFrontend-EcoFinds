import { BACKEND_API_URL } from "@/constants/apiConstants";

interface OtpResponse {
  success: boolean;
  error?: string;
}

interface SignupResponse {
  success: boolean;
  error?: string;
}

export const authService = {
  companyAdminSignupOtp: async ({
    mobile,
  }: {
    mobile: string;
  }): Promise<OtpResponse> => {
    try {
      const response = await fetch(`${BACKEND_API_URL}/auth/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  },

  companyAdminMobileSignup: async ({
    mobile,
    otp,
  }: {
    mobile: string;
    otp: string;
  }): Promise<SignupResponse> => {
    try {
      const response = await fetch(`${BACKEND_API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp }),
      });

      if (!response.ok) {
        throw new Error("Failed to verify OTP");
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  },
};
