export function setOnFpConfiguredCallback(callback) {
    window.floorplan.onFpConfigured = callback;
}

export function selectCurrentPosition(x, y, z, focus) {
    window.floorplan.selectCurrentPosition({ x: x, y: y, z: z ?? null }, focus ?? false);
}

export function setOnGetCoordsClickCallback(callback) {
    window.floorplan.onGetCoordsClick = callback;
}

export function setOnBoothClickCallback(callback) {
    window.floorplan.onBoothClick = callback;
}

export function destroyFloorplan(){
    if(window.floorplan?.unstable_destroy != null){
        window.floorplan.unstable_destroy();
    }
}