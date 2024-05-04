import { ACCESS_TOKEN_KEY } from "../common/constants";
import { Plan } from "../common/types";

export default class PlansApi {

    /*private static plans: Plan[] = [
        { id: 1, userId: 1, name: "Demo", description: "demo plan", url: "https://demo.expofp.com" },
    ];*/

    public static async getPlansByUserId(userId: number): Promise<Plan[]> {
        const response = await fetch(`/api/plans/getByUserId/${userId}`, {
            method: "GET",
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        });

        if (response.status == 200 && response.ok === true) {
            const responseData = await response.json();
            console.log(responseData);
            return responseData
        }

        return []
    }

    public static async getPlanById(id: number): Promise<Plan | null> {
        const response = await fetch(`/api/plans/${id}`, {
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

    public static async createPlan(plan: Plan) {
        const response = await fetch(`/api/plans`, {
            method: "POST",
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN_KEY)
            },
            
            body: JSON.stringify(plan),
        });

        if (response.status == 200 && response.ok === true) {
            const responseData = await response.json();
            console.log(responseData);
            return responseData
        }

        return null
    }

    public static async updatePlan(plan: Plan) {
        const response = await fetch(`/api/plans`, {
            method: "PATCH",
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(plan),
        });

        if (response.status == 200 && response.ok === true) {
            const responseData = await response.json();
            console.log(responseData);
            return responseData
        }

        return null
    }

    public static async deletePlan(id: number) {
        const response = await fetch(`/api/plans/${id}`, {
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