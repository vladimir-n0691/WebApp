import { ACCESS_TOKEN_KEY, API_URL, USER_ID_KEY } from "../common/constants";

export default class AuthApi {
    public static async login(login: string, password: string): Promise<boolean> {
        const response = await fetch(`${API_URL}/api/auth/login?login=${login}&password=${password}`, {
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
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        localStorage.removeItem(USER_ID_KEY)
      }
}