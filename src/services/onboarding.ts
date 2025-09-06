import { BACKEND_API_URL } from "@/constants/apiConstants";

interface LeadData {
  companyName: string;
  userName: string;
  phoneNumber: string;
}

interface LeadResponse {
  success: boolean;
  error?: string;
}

export const onboardingService = {
  submitLead: async (data: LeadData): Promise<LeadResponse> => {
    try {
      const response = await fetch(`${BACKEND_API_URL}/onboarding/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
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
