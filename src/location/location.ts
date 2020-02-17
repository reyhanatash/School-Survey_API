import * as Model from './locationModel';
import * as Config from '../../config';
import * as mysql from 'mysql';

export default class location {
    public connection;
    constructor() {
        this.connection = mysql.createPool(Config.dbConnection.dbConfig);
    }
    //add or update
    AddLocation(locationModel: Model.LocationOData) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_ADD_OR_EDIT_LOCATION(?,?,?)';
            this.connection.query(
                qry,
                [
                    locationModel.id,
                    locationModel.name,
                    locationModel.description
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
    DeleteLocation(id: number) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_DELETE_LOCATION_INFO(?)';
            this.connection.query(qry, [id], (err, result, field) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }
    LoadAllLocation(id: number) {
        return new Promise((resolve, reject) => {
            let qry = 'Call sp_selectall_location(?)';
            this.connection.query(qry, [id], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }
    checkLocationName(name: string) {
        return new Promise((resolve, reject) => {
            let qry = 'Call SP_CHECK_SCHOOL_NAME(?)';
            this.connection.query(qry, [name], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }
}
