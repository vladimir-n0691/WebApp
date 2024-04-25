export function setOnFpConfiguredCallback(callback) {
    try {
        window.floorplan.onFpConfigured = callback
    }
    catch { }
}

export function selectCurrentPosition(x, y, z, focus) {
    try {
        window.floorplan.selectCurrentPosition({ x: x, y: y, z: z ?? null }, focus ?? false)
    }
    catch { }
}

export function setOnGetCoordsClickCallback(callback) {
    window.floorplan.ready?.then(() => {
        try {
            window.floorplan.onGetCoordsClick = callback;
        }
        catch { }
    })
}

export function setOnBoothClickCallback(callback) {
    window.floorplan.ready?.then(() => {
        try {
            window.floorplan.onBoothClick = callback
        }
        catch { }
    })
}

export function destroyFloorplan() {
    window.floorplan.ready?.then(() => {
        try {
            if (window.floorplan?.unstable_destroy != null) {
                window.floorplan.unstable_destroy()
            }
        }
        catch { }
    })
}