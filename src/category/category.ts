import * as mysql from 'mysql';
import * as Config from '../../config';
import * as Model from './categoryModel';

export default class Category {
    public connection;
    constructor() {
        this.connection = mysql.createPool(Config.dbConnection.dbConfig);
    }
    addCategory(createModel: Model.categoryOData) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL Sp_CREATE_CATEGORY(?,?,?)';

            this.connection.query(
                qry,
                [
                    createModel.name,
                    createModel.description,
                    createModel.locaionId
                ],
                (err, result, field) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result[0]);
                }
            );
        });
    }
    updateCategory(createModel: Model.categoryOData) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_UPDATE_CATEGORY(?,?,?)';

            this.connection.query(
                qry,
                [createModel.id, createModel.name, createModel.description],
                (err, result, field) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result[0]);
                }
            );
        });
    }
    selectAllCategory(locaionId) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_SELECTALL_CATEGORY(?)';
            this.connection.query(qry, [locaionId], (err, result, field) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }
    deleteCategory(id) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL sp_delete_category(?)';
            this.connection.query(qry, [id], (err, result, field) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }
}
