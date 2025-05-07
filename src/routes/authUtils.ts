// src/utils/authUtils.ts
export const isTokenValid = (): boolean => {
  const token = localStorage.getItem("access_token");
  if (!token) return false; // If no token, user is not logged in
  // Optionally, check for token expiration if you're using JWT tokens
  return true; // If token exists, consider it valid
};
