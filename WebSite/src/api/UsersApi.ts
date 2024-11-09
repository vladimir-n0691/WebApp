import { API_URL} from "../common/constants";
import { User } from "../common/types";

export default class UsersApi {
  public static async getAll(): Promise<User[]> {

    const response = await fetch(`${API_URL}/api/users/getall`, {
      method: "GET",
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    });

    if (response.status == 200 && response.ok === true) {
      const responseData = await response.json();
      return responseData
    }

    return []
  }

  public static async getById(id: number): Promise<User | null> {
    const response = await fetch(`${API_URL}/api/users/${id}`, {
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

  public static async create(user: User) {
    const response = await fetch(`${API_URL}/api/users`, {
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

  public static async update(user: User): Promise<boolean> {
    const response = await fetch(`${API_URL}/api/users`, {
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

  public static async delete(id: number) {
    const response = await fetch(`${API_URL}/api/users/${id}`, {
      method: "DELETE",
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    });

    if (response.status == 200 && response.ok === true) {
      const responseData = await response.json();
      console.log(responseData);
      return responseData
    }

    return null
  }
}