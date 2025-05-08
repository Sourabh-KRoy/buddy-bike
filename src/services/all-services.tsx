import { api_url } from "./api-url";

export const login = async (username: string, password: string) => {
  try {
    const response = await fetch(`${api_url}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }), // Using email and password in the request body
    });

    if (!response.ok) {
      throw new Error("Login failed. Server returned an error.");
    }

    const textResponse = await response.text(); // Get the response as plain text
    if (!textResponse) {
      throw new Error("Empty response from server");
    }

    const data = JSON.parse(textResponse); // Now parse the text response

    if (data?.token) {
      // Save the token to localStorage
      localStorage.setItem("token", data.token);
      return data; // Return the data if access_token is found
    } else {
      throw new Error("Access token not found in response");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Login failed");
  }
};
