import { User } from "../common/types";

export default class UsersApi {

  private static users: User[] = [];


  public static async createUser(user: User) {
    let id = 0;
    UsersApi.users.forEach(p => p.id > id && (id = p.id))
    UsersApi.users = [...UsersApi.users, { ...user, id: (id + 1) }]
  }

  public static async getUser(token: string): Promise<User | null> {
    return {id: 1, firstName: "firstName", lastName: "lastName", email: "email", company: "HOME", password: "**************"}
  }


  public static async login(email: string, password: string): Promise<string | null> {

    if (UsersApi.users.findIndex(p => p.email === email && p.password === password) >= 0) {
      return "accessToken123"
    }
    else {
      return null;
    }

    //TODO return
    /*const response = await fetch(`/api/auth/login?user=${login}&password=${password}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if(response.status == 200 && response.ok === true){
      const responseData = await response.json();
      localStorage.setItem(ACCESS_TOKEN_KEY, responseData.access_token);
      console.log(responseData.access_token);
      window.location.href = '/';
    }
    else {
      alert("Error")
    }*/
  }

  public static async logout(accessToken: string) {

  }

}