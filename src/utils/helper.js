import { setCookie, deleteCookie } from "cookies-next";
export const randString = (len) => {
  let randStr = "";
  for (let i = 0; i < len; i++) {
    const ch = Math.floor(Math.random() * 10);
    randStr += ch;
  }
  return randStr;
};
export const setToken = (token) => {
  setCookie("token", token); // Save token in cookies
};
export const removeToken = () => {
  deleteCookie("token");
};
export function capitalize(str) {
  if (!str) return ""; // Handle empty or null strings
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
}
