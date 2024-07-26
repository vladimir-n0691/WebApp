export default class Helper {

    public static getSubDomain(url: string) {
        const regex: RegExp = new RegExp('(?:https:\/\/)?(?:([^.]+)\.)?expofp\.com');
        let result: RegExpExecArray | null = regex.exec(url);
        let subDomain = result ? result[1] : null
        return subDomain
    }

    public static generateGUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    public static getBlueDotUrl(url: string, x: number, y: number, z: string | null) {
        if (z != null && z.length > 0) {
            return `${url}?blue-dot=${x},${y},${z}`
        }
        else {
            return `${url}?blue-dot=${x},${y}`
        }
    }
}