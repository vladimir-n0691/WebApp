import { ACCESS_TOKEN_KEY, USER_ID_KEY } from "../common/constants";
import { CreateUserRequest, User } from "../common/types";

export default class UsersApi {
  public static async createUser(user: User) {
    const response = await fetch(`/api/users`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (response.status == 200 && response.ok === true) {
      const responseData = await response.json();
      console.log(responseData);
      return ""
    }
    else {
      return null;
    }
  }

  public static async updateUser(user: User): Promise<boolean> {
    const response = await fetch(`/api/users`, {
      method: 'PATCH',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    if (response.status == 200 && response.ok === true) {
      const responseData = await response.json();
      console.log(responseData);
      return true
    }
    else {
      return false;
    }
  }

  public static async getUserById(id: number): Promise<User | null> {
    const response = await fetch(`/api/users/${id}`, {
      method: "GET",
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    });

    if (response.status == 200 && response.ok === true) {
      const responseData = await response.json();
      console.log(responseData);
      return responseData
    }

    return null
  }

  public static async login(login: string, password: string): Promise<boolean> {
    const response = await fetch(`/api/auth/login?login=${login}&password=${password}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (response.status == 200 && response.ok === true) {
      const responseData = await response.json()
      console.log(responseData)

      localStorage.setItem(ACCESS_TOKEN_KEY, responseData.access_token)
      localStorage.setItem(USER_ID_KEY, responseData.user_id)

      return true
    }

    return false
  }

  public static async logout() {
    localStorage.setItem(ACCESS_TOKEN_KEY, "")
    localStorage.setItem(USER_ID_KEY, "")
  }
}