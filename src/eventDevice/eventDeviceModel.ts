export class EventDeviceOData {
    public id: number;
    public deviceId: number;
    public eventId: number;
}

export class AnswerOData {
    public serialNo: number;
    public answer: number;
    public devoceId: number;
    public questionId: string;
    public eventId: number;
}

export class Rent {
    public Id: number;
    public Devices: string;
    public StartDate: string;
    public EndDate: string;
    public LocationId: number;
}
