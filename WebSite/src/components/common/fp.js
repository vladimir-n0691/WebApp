export function selectCurrentPosition(x, y, z, focus) {
    window.floorplan.selectCurrentPosition({ x: x, y: y, z: z ?? null }, focus ?? false);
}

export function setOnGetCoordsClickCallback(callback) {
    window.floorplan.onGetCoordsClick = callback;
}