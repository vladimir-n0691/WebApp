import { QrCode } from "../common/types"

export default class QrCodesApi {
    private static qrCodes: QrCode[] = [
    ]

    public static async getQrCodes(planId: number): Promise<QrCode[]> {
        return QrCodesApi.qrCodes
    }

    public static async editQrCode(qrCode: QrCode) {
        if(qrCode.id < 0){
            let id = 0;
            QrCodesApi.qrCodes.forEach(p => p.id > id && (id = p.id))
            QrCodesApi.qrCodes = [...QrCodesApi.qrCodes, {...qrCode, id: (id+1)} ]
        }
        else {
            QrCodesApi.qrCodes = [...QrCodesApi.qrCodes.filter(p=> p.id != qrCode.id), qrCode]
        }
    }

    public static async deleteQrCode(id: number) {
        QrCodesApi.qrCodes = QrCodesApi.qrCodes.filter(p => p.id != id)
    }
}

