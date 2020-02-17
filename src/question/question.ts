import * as Config from '../../config';
import * as mysql from 'mysql';
import * as Model from './questionModel';

export default class Question {
    public connection;
    constructor() {
        this.connection = mysql.createPool(Config.dbConnection.dbConfig);
    }
    //add or update
    AddQuestion(questionModel: Model.QuestionOData) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL sp_create_question(?,?,?,?,?,?,?,?,?)';
            this.connection.query(
                qry,
                [
                    questionModel.id,
                    questionModel.categoryId,
                    questionModel.question,
                    questionModel.description,
                    questionModel.answer1,
                    questionModel.answer2,
                    questionModel.answer3,
                    questionModel.answer4,
                    questionModel.answer5
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

    deleteQuestion(id: number) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL SP_DELETE_QUESTION(?)';
            this.connection.query(qry, [id], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }
    selectAllQuestion(id) {
        return new Promise((resolve, reject) => {
            let qry = 'CALL sp_selectall_question(?)';
            this.connection.query(qry, [id], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }
}
