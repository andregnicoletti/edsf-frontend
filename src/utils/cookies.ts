import Cookies from "js-cookie";

export function checkToken() {
  return "token";
  // const cookies = Cookies.get("token");
  // return !!cookies;
}

export function saveToken(token: string) {
  Cookies.set("token", token, { secure: false });
}

export function removeToken() {
  Cookies.remove("token");
}
