import { api_url } from "./api-url";

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${api_url}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }), // Using email and password in the request body
    });

    if (!response.ok) {
      throw new Error("Login failed. Server returned an error.");
    }

    const textResponse = await response.text(); // Get the response as plain text
    if (!textResponse) {
      throw new Error("Empty response from server");
    }

    const data = JSON.parse(textResponse); // Now parse the text response

    if (data?.access_token) {
      // Save the access_token to localStorage
      localStorage.setItem("access_token", data.access_token);
      return data; // Return the data if access_access_token is found
    } else {
      throw new Error("Access access_token not found in response");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Login failed");
  }
};

export const signup = async (email: string, password: string) => {
  try {
    const response = await fetch(`${api_url}/auth/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Signup failed. Server returned an error.");
    }

    const data = await response.json(); // Expecting: { message: "User created" }
    return data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw new Error("Signup failed");
  }
};

export const getBike = async () => {
  try {
    const response = await fetch(`${api_url}/bikes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data");
  }
};

export const createBooking = async (payload: any) => {
  try {
    const response = await fetch(`${api_url}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), // Directly pass the payload
    });

    if (!response.ok) {
      throw new Error(`Booking failed: ${response.statusText}`);
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in creating booking", error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
};

export const getBookingBikeOwner = async (userId: any) => {
  try {
    const response = await fetch(`${api_url}/bookings/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data");
  }
};

export const getAllBooking = async () => {
  try {
    const response = await fetch(`${api_url}/bookings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data");
  }
};

export const addBike = async (formData: FormData) => {
  try {
    const response = await fetch(`${api_url}/bikes`, {
      method: "POST",
      body: formData, // DO NOT stringify
      // Do NOT set Content-Type, browser will handle it
    });

    if (!response.ok) {
      throw new Error(`Bike creation failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in creating bike", error);
    throw error;
  }
};

export const updateBike = async (formData: FormData, bikeId: string) => {
  const response = await fetch(`${api_url}/bikes/update/${bikeId}`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to update bike");
  return response.json();
};

export const deleteBike = async (bikeId: string) => {
  const response = await fetch(`${api_url}/bikes/delete/${bikeId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete bike");
  return response.json();
};

export const statusUpdate = async (payload: any, bookingId: any) => {
  try {
    // Make sure the payload is in JSON format
    const response = await fetch(`${api_url}/bookings/${bookingId}/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set Content-Type to application/json
      },
      body: JSON.stringify(payload), // Stringify the payload
    });

    if (!response.ok) {
      throw new Error(`Status update failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in updating status:", error);
    throw error;
  }
};

export const getAllUser = async () => {
  try {
    const response = await fetch(`${api_url}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data");
  }
};

export const deleteUser = async (userId: any) => {
  const response = await fetch(`${api_url}/api/users/${userId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete bike");
  return response.json();
};

export const updateUser = async (id: string, userData: any) => {
  const res = await fetch(`${api_url}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
};

export const createUser = async (email: string, password: string) => {
  const res = await fetch(`${api_url}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
};
