export async function getProfile(auth0Id: string) {
  try {
    const encodedId = encodeURIComponent(auth0Id);

    const response = await fetch(
      `https://bi6doaxj6yclz45njguhvjhyaq0idzdo.lambda-url.us-east-1.on.aws/?auth0Id=${encodedId}`
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting profile:", error);
    return null;
  }
}