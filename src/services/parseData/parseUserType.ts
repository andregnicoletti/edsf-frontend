import { UserType } from "@/store/features/User/userSlice";

export function parseUserType(userType: string) {
  if (userType === "admin") {
    return UserType.ADMIN;
  }
  return UserType.USER;
}