import * as Config from '../../config';
import * as mysql from 'mysql';
import * as Model from './deviceModel';
export default class Device {
    public connection;
    constructor() {
        this.connection = mysql.createPool(Config.dbConnection.dbConfig);
    }
    AddDevice(deviceModel: Model.deviceOData) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL sp_create_device(?,?,?,?)';
            this.connection.query(
                qry,
                [
                    deviceModel.id,
                    deviceModel.serialNo,
                    deviceModel.PropertyNo,
                    deviceModel.description
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
    GetAllDevieses(id) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL sp_selectall_device(?)';
            this.connection.query(qry, [id], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }
    GetAvailableDevieses() {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_LOAD_AVAILABLE_DEVICES_FOR_RENT';
            this.connection.query(qry, (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }
    DeleteDevice(id: number) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_DELETE_DEVICE(?)';
            this.connection.query(qry, [id], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }
}
