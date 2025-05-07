export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(
      "https://gateway.fm.apps.workeye.in/us/v1/api/authKeyClock/getToken",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Using email and password in the request body
      }
    );

    if (!response.ok) {
      throw new Error("Login failed. Server returned an error.");
    }

    const textResponse = await response.text(); // Get the response as plain text
    if (!textResponse) {
      throw new Error("Empty response from server");
    }

    const data = JSON.parse(textResponse); // Now parse the text response

    if (data?.access_token) {
      // Save the token to localStorage
      localStorage.setItem("access_token", data.access_token);
      return data; // Return the data if access_token is found
    } else {
      throw new Error("Access token not found in response");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Login failed");
  }
};
