import Cookies from "js-cookie";

const TokenKey = "Authorization";
const RefreshTokenKey = "refresh-token";

export function getToken() {
  return Cookies.get(TokenKey);
}
export function getTokenKey(): string {
  return TokenKey;
}
export function getRefreshTokenKey() {
  return RefreshTokenKey;
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token);
}

export function getRefreshToken(): string {
  return Cookies.get(RefreshTokenKey) || "";
}

export function setRefreshToken(refreshToken: string) {
  return Cookies.set(RefreshTokenKey, refreshToken);
}

export function removeToken() {
  Cookies.remove(TokenKey);
  Cookies.remove(RefreshTokenKey);
}
