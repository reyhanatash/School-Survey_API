import * as Config from '../../config';
import * as mysql from 'mysql';
import * as Model from './eventModel';

export default class event {
    public connection;
    constructor() {
        this.connection = mysql.createPool(Config.dbConnection.dbConfig);
    }
    RateAvreage(id: number, type, start, end) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SpRateAverage(?,?,?,?)';
            this.connection.query(
                qry,
                [id, type, start, end],
                (err, result, fields) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result[0]);
                }
            );
        });
    }
    //Add and Update
    AddEvent(eventModel: Model.EventOData) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL sp_create_event(?,?,?,?,?,?,?,?)';
            let start = eventModel.startDate.replace('T', ' ');
            start = start.replace('Z', '');
            let end = eventModel.endDate.replace('T', ' ');
            end = end.replace('Z', '');
            this.connection.query(
                qry,
                [
                    eventModel.id,
                    eventModel.categoryId,
                    eventModel.locationId,
                    start,
                    end,
                    eventModel.description,
                    eventModel.name,
                    eventModel.userId
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
    deleteEvent(id: number) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_DELETE_EVENT(?)';
            this.connection.query(qry, [id], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }
    getallEvents(id) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL sp_selectall_event(?)';
            this.connection.query(qry, [id], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                result[0].map(x => {
                    if (x.startDate && x.endDate) {
                        x.endDate = x.endDate.replace(' ', 'T');
                        x.endDate = x.endDate + 'Z';
                        x.startDate = x.startDate.replace(' ', 'T');
                        x.startDate = x.startDate + 'Z';
                    }
                });
                return resolve(result[0]);
            });
        });
    }
    managerEvent(id: number) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_LOAD_EVENT_BY_MANAGER_ID(?)';
            this.connection.query(qry, [id], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                result[0].map(x => {
                    if (x.startDate && x.endDate) {
                        x.endDate = x.endDate.replace(' ', 'T');
                        x.endDate = x.endDate + 'Z';
                        x.startDate = x.startDate.replace(' ', 'T');
                        x.startDate = x.startDate + 'Z';
                    }
                });
                return resolve(result[0]);
            });
        });
    }
    currentEvent(id: number) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_EVENT_RESULTS_BY_MNG_ID(?)';
            this.connection.query(qry, [id], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }
}
