import * as Config from '../../config';
import * as mysql from 'mysql';
import * as Model from './eventDeviceModel';

export default class EventDevice {
    public connection;
    constructor() {
        this.connection = mysql.createPool(Config.dbConnection.dbConfig);
    }
    CreateEventDevice(eventDeviceModel: Model.EventDeviceOData) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL sp_create_event_device(?,?)';
            this.connection.query(
                qry,
                [eventDeviceModel.eventId, eventDeviceModel.deviceId],
                (err, result, fields) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result[0]);
                }
            );
        });
    }

    deleteEventDevice(id: number) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_DELETE_EVENTDEVICE(?)';
            this.connection.query(qry, [id], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }
    selectEventInfo(serialNO: string) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_LOAD_EVENT_BY_DEVICE_SERIAL(?)';
            this.connection.query(qry, [serialNO], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                result[0].map(x => {
                    if (x.FLD_START_DATE && x.FLD_END_DATE) {
                        x.FLD_END_DATE = x.FLD_END_DATE.replace(' ', 'T');
                        x.FLD_END_DATE = x.FLD_END_DATE + '.000Z';
                        x.FLD_START_DATE = x.FLD_START_DATE.replace(' ', 'T');
                        x.FLD_START_DATE = x.FLD_START_DATE + '.000Z';
                    }
                });
                return resolve(result[0]);
            });
        });
    }
    SelectEventDeviceBySerialNum(serialNO: string) {
        return new Promise((resolve, reject) => {
            let qry = 'Call SP_LOAD_CURRENT_EVENT(?)';
            this.connection.query(qry, [serialNO], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                result[0].map(x => {
                    if (x.FLD_START_DATE && x.FLD_END_DATE) {
                        x.FLD_END_DATE = x.FLD_END_DATE.replace(' ', 'T');
                        x.FLD_END_DATE = x.FLD_END_DATE + '.000Z';
                        x.FLD_START_DATE = x.FLD_START_DATE.replace(' ', 'T');
                        x.FLD_START_DATE = x.FLD_START_DATE + '.000Z';
                    }
                });
                return resolve(result[0]);
            });
        });
    }
    selectDiveByEvent(eventId: number) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL sp_selectDevicebyEvent(?)';
            this.connection.query(qry, [eventId], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }
    deleteEventDevicebyEventId(eventId: number) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_DELETE_EVENTDEVICEBYEVENT(?)';
            this.connection.query(qry, [eventId], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }
    createAnswer(answerModel: Model.AnswerOData) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL sp_create_answer(?,?,?,?)';
            this.connection.query(
                qry,
                [
                    answerModel.devoceId,
                    answerModel.questionId,
                    answerModel.answer,
                    answerModel.eventId
                ],
                (err, result, fields) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result[0]);
                }
            );
        });
    }
    getResult(eventId: number) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL sp_evnt_results(?,?,?)';
            this.connection.query(
                qry,
                [eventId, null, null],
                (err, result, fields) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result[0]);
                }
            );
        });
    }
    getResultByRange(eventId: number, startDate: Date, endDate: Date) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL sp_evnt_results(?,?,?)';
            this.connection.query(
                qry,
                [eventId, startDate, endDate],
                (err, result, fields) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result[0]);
                }
            );
        });
    }
    createRent(rentModel: Model.Rent) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_SUBMIT_RENT_INFO(?,?,?,?,?)';
            let start = rentModel.StartDate.replace('T', ' ');
            start = start.replace('Z', '');
            let end = rentModel.EndDate.replace('T', ' ');
            end = end.replace('Z', '');
            this.connection.query(
                qry,
                [
                    rentModel.Id,
                    start,
                    end,
                    rentModel.LocationId,
                    rentModel.Devices
                ],
                (err, result, fields) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result[0]);
                }
            );
        });
    }
    deleteRent(rentId: Number) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_DELETE_RENT_INFO(?)';
            this.connection.query(qry, [rentId], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }
    selectRents() {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_LOAD_RENTALS(?)';
            this.connection.query(qry, [-1], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                result[0].map(x => {
                    if (x.FLD_END_DATE && x.FLD_START_DATE) {
                        x.FLD_END_DATE = x.FLD_END_DATE.replace(' ', 'T');
                        x.FLD_END_DATE = x.FLD_END_DATE + '.000Z';
                        x.FLD_START_DATE = x.FLD_START_DATE.replace(' ', 'T');
                        x.FLD_START_DATE = x.FLD_START_DATE + '.000Z';
                    }
                });
                return resolve(result[0]);
            });
        });
    }
}
