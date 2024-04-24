import { QrCode } from "../../common/types";

export const downloadQrCode = (elementId: string, name: string) => {
    const canvas: any = document.getElementById(elementId);
    if (canvas) {
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl
        downloadLink.download = `${name}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}