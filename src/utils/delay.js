// Small helper to simulate a network delay for mock API calls.
// This keeps async flows realistic while staying beginner-friendly.
export async function delay(ms = 500) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

