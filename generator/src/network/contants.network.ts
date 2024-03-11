export const BASE_HEADER = { "Content-Type": "application/json" };
export const generateBearerToken = (accessToken: string) => `Bearer ${accessToken}`;
export const generateRefreshToken = (refreshToken: string) => `Refresh ${refreshToken}`;
