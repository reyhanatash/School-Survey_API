import * as mysql from 'mysql';
import * as Config from '../../config';
import * as usermodel from './userModel';

interface IDisposable {
    dispose();
}

export default class User {
    public connection;
    constructor() {
        this.connection = mysql.createPool(Config.dbConnection.dbConfig);
    }
    Login(loginModel: usermodel.login) {
        return new Promise((resolve, reject) => {
            let qry = `CALL Sp_Login(?,?)`;
            this.connection.query(
                qry,
                [loginModel.username, loginModel.password],
                (err, result, fields) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result[0]);
                }
            );
        });
    }

    GetAllUser(id, location) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SP_LOAD_USERS(?,?)`;
            this.connection.query(
                qry,
                [id, location],
                (err, result, fields) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result[0]);
                }
            );
        });
    }
    register(registerModel: usermodel.register) {
        return new Promise((resolve, reject) => {
            let qry = 'SP_CREATE_USER(?,?,?,?,?,?,?)';
            this.connection.query(
                qry,
                [
                    0,
                    registerModel.username,
                    registerModel.password,
                    registerModel.type,
                    registerModel.email,
                    registerModel.mobile,
                    registerModel.location
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
    createManager(managerModel: usermodel.Manager) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_SIGNUP(?,?,?,?,?,?,?)';
            this.connection.query(
                qry,
                [
                    managerModel.id,
                    managerModel.username,
                    managerModel.password,
                    managerModel.type, //type
                    '', //email
                    '', //mobile
                    managerModel.locationId
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
    deleteManager(managerId: number) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_DELETE_MANAGER(?)';
            this.connection.query(qry, [managerId], (err, result, fields) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(result[0]);
                }
            });
        });
    }
    GetAllManager(id) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SP_LOAD_MANAGER(?,?)`;
            this.connection.query(qry, [-1, id], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }
    eventLoad(managerId: number) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_LOAD_EVENT_BY_MANAGER_ID(?)';
            this.connection.query(qry, [managerId], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }

    checkName(name: string) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_CHECK_USER_NAME(?)';
            this.connection.query(qry, [name], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }
    getInfo(email: string, number: string) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_GET_PARTICIPANT_INFO(?,?)';
            this.connection.query(
                qry,
                [email, number],
                (err, result, fields) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result[0]);
                }
            );
        });
    }
    changePass(changePassOData: usermodel.ChangePass) {
        let qry = 'CALL SP_CHANGE_PASSWORD(?,?,?)';
        return new Promise((resolve, reject) => {
            this.connection.query(
                qry,
                [
                    changePassOData.id,
                    changePassOData.password,
                    changePassOData.newPassword
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
    changeActive(id: number, type: boolean) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_DEACTIVE_OR_ACTIVE_USER(?,?)';
            this.connection.query(qry, [id, type], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }
}
