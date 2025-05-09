// src/utils/authUtils.ts
export const isTokenValid = (): boolean => {
  const tokenData = localStorage.getItem("access_token");
  if (!tokenData) return false; // If no token, user is not logged in
  // Optionally, check for token expiration if you're using JWT tokens
  return true; // If token exists, consider it valid
};
