import { NextResponse } from "next/server";

// Cache the response for 4 hours instead of 24 hours for more up-to-date rates
export const revalidate = 14400;

// Try multiple API providers for better reliability
async function fetchFromPrimaryAPI() {
  const response = await fetch(
    "https://api.frankfurter.dev/v1/latest?base=USD"
  );
  if (!response.ok) throw new Error("Primary API failed");
  return await response.json();
}

async function fetchFromBackupAPI() {
  const response = await fetch(
    "https://api.frankfurter.dev/v1/latest?base=USD"
  );
  if (!response.ok) throw new Error("Backup API failed");
  return await response.json();
}

// Third backup option using a different provider
async function fetchFromTertiaryAPI() {
  const response = await fetch(
    "https://api.frankfurter.dev/v1/latest?base=USD"
  );
  if (!response.ok) throw new Error("Tertiary API failed");
  return await response.json();
}

export async function GET() {
  try {
    // Try APIs in sequence
    let data;
    let source = "";

    try {
      data = await fetchFromPrimaryAPI();
      source = "Frankfurter API";
    } catch (primaryError) {
      console.error("Primary exchange rate API failed:", primaryError);

      try {
        data = await fetchFromBackupAPI();
        source = "Frankfurter API";
      } catch (backupError) {
        console.error("Backup exchange rate API failed:", backupError);

        try {
          data = await fetchFromTertiaryAPI();
          source = "Frankfurter API";
        } catch (tertiaryError) {
          console.error("Tertiary exchange rate API failed:", tertiaryError);
          throw new Error("All exchange rate APIs failed");
        }
      }
    }

    // Extract only the currencies we need to reduce payload size
    const rates = {
      USD: 1, // Base currency is always 1
      INR: data.rates.INR,
      EUR: data.rates.EUR,
      GBP: data.rates.GBP,
    };

    // Validate that we have all required rates
    if (!rates.INR || !rates.EUR || !rates.GBP) {
      throw new Error("Missing required exchange rates in API response");
    }

    return NextResponse.json({
      success: true,
      rates,
      timestamp: Date.now(),
      source,
    });
  } catch (error) {
    console.error("Error fetching exchange rates:", error);

    // Return error response - the client will try to use cached rates from localStorage
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error fetching exchange rates",
        timestamp: Date.now(),
      },
      { status: 503 } // Service Unavailable
    );
  }
}
