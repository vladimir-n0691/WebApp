import { Plan } from "../common/types";

export default class PlansApi {

    private static  plans: Plan[] = [
        { id: 1, name: "111", description: "SSAFa1111111111", url: "https://demo.expofp.com/" },
        { id: 2, name: "222", description: "SSAFa22222222222222222", url: "https://plan863.expofp.com/" },
        { id: 3, name: "333", description: "SSAFa333333333333333333", url: "https://demo.expofp.com/" },
        { id: 7, name: "4444", description: "SSAFa44444444444444444444", url: "https://demo.expofp.com/" }
      ];



    public static async getPlans(): Promise<Plan[]> {
          return PlansApi.plans
    }

    public static async editPlan(plan: Plan) {
        if(plan.id < 0){
            let id = 0;
            PlansApi.plans.forEach(p => p.id > id && (id = p.id))
            PlansApi.plans = [...PlansApi.plans, {...plan, id: (id+1)} ]
        }
        else {
            PlansApi.plans = [...PlansApi.plans.filter(p=> p.id != plan.id), plan]
        }
    }

    public static async deletePlan(id: number) {
        PlansApi.plans = PlansApi.plans.filter(p=> p.id != id)
    }


}