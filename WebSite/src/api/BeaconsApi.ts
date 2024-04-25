import { Beacon } from "../common/types";

export default class BeaconsApi {
    private static beacons: Beacon[] = [
        /*{ id: 1, name: "Beacon_1", description: "1", uuid: "e6f3421a-5179-4f8b-b317-343ab537713b", major: 1, minor: 101, x: 44252, y: 11000, z: "2" },
        { id: 2, name: "Beacon_2", description: "1", uuid: "e6f3421a-5179-4f8b-b317-343ab537713b", major: 1, minor: 101, x: 46852, y: 12852, z: "2" },
        { id: 3, name: "Beacon_3", description: "1", uuid: "e6f3421a-5179-4f8b-b317-343ab537713b", major: 1, minor: 101, x: 45052, y: 14352, z: "2" },
        { id: 4, name: "Beacon_4", description: "1", uuid: "e6f3421a-5179-4f8b-b317-343ab537713b", major: 1, minor: 101, x: 44552, y: 11600, z: "2" },
        { id: 5, name: "Beacon_5", description: "1", uuid: "e6f3421a-5179-4f8b-b317-343ab537713b", major: 1, minor: 101, x: 43152, y: 12352, z: "2" },
        { id: 6, name: "Beacon_6", description: "1", uuid: "e6f3421a-5179-4f8b-b317-343ab537713b", major: 1, minor: 101, x: 42252, y: 12652, z: "2" },
        { id: 7, name: "Beacon_7", description: "1", uuid: "e6f3421a-5179-4f8b-b317-343ab537713b", major: 1, minor: 101, x: 43000, y: 13652, z: "2" },
        { id: 8, name: "Beacon_8", description: "1", uuid: "e6f3421a-5179-4f8b-b317-343ab537713b", major: 1, minor: 101, x: 43252, y: 12652, z: "2" },
        { id: 9, name: "Beacon_9", description: "1", uuid: "e6f3421a-5179-4f8b-b317-343ab537713b", major: 1, minor: 101, x: 44052, y: 13652, z: "2" },
        { id: 10, name: "Beacon_10", description: "1", uuid: "e6f3421a-5179-4f8b-b317-343ab537713b", major: 1, minor: 101, x: 44652, y: 14722, z: "2" },*/
    ]

    public static async getBeacons(planId: number): Promise<Beacon[]> {
        return BeaconsApi.beacons
    }

    public static async editBeacon(beacon: Beacon) {
        if(beacon.id < 0){
            let id = 0;
            BeaconsApi.beacons.forEach(p => p.id > id && (id = p.id))
            BeaconsApi.beacons = [...BeaconsApi.beacons, {...beacon, id: (id+1)} ]
        }
        else {
            BeaconsApi.beacons = [...BeaconsApi.beacons.filter(p=> p.id != beacon.id), beacon]
        }
    }

    public static async deleteBeacon(id: number) {
        BeaconsApi.beacons = BeaconsApi.beacons.filter(p => p.id != id)
    }
}