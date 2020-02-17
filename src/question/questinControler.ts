import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../config';
import Question from './question';
import * as Model from './questionModel';

class QuestionControler {
    public router: express.router;
    public question: Question;
    constructor() {
        this.router = express.Router();
        this.question = new Question();
        this.config();
        this.call();
    }
    config() {
        this.router.use(bodyParser.urlencoded({ extended: true }));
        this.router.use(bodyParser.json());
    }
    call() {
        //api/question/addquestion
        this.router.post('/api/question/addquestion', (req, res) => {
            var token = req.headers['x-access-token'];
            if (!token) {
                return res
                    .status(401)
                    .send({ auth: false, message: 'No token provided.' });
            }
            jwt.verify(token, config.key, (err, decoded) => {
                if (err)
                    return res.status(500).send({
                        auth: false,
                        message: 'Failed to authenticate token.'
                    });

                let questionModel = new Model.QuestionOData();
                questionModel.id = req.body.id ? req.body.id : 0;
                questionModel.question = req.body.question;
                questionModel.description = req.body.description;
                questionModel.categoryId = req.body.categoryId;
                questionModel.answer1 = req.body.answer1;
                questionModel.answer2 = req.body.answer2;
                questionModel.answer3 = req.body.answer3;
                questionModel.answer4 = req.body.answer4;
                questionModel.answer5 = req.body.answer5;
                this.question
                    .AddQuestion(questionModel)
                    .then(data => {
                        res.status(200).send({
                            msg: 'success',
                            data: data,
                            status: 200
                        });
                    })
                    .catch(error => {
                        res.status(200).send({
                            msg: 'fail',
                            data: error,
                            status: 400
                        });
                    });
            });
        });

        this.router.post('/api/question/deletequestion', (req, res) => {
            var token = req.headers['x-access-token'];
            if (!token) {
                return res
                    .status(401)
                    .send({ auth: false, message: 'No token provided.' });
            }
            jwt.verify(token, config.key, (err, decoded) => {
                if (err)
                    return res.status(500).send({
                        auth: false,
                        message: 'Failed to authenticate token.'
                    });

                let id = req.body.id;
                this.question
                    .deleteQuestion(id)
                    .then(data => {
                        res.status(200).send({
                            msg: 'success',
                            data: data,
                            status: 200
                        });
                    })
                    .catch(error => {
                        res.status(200).send({
                            msg: 'fail',
                            data: error,
                            status: 400
                        });
                    });
            });
        });
        this.router.get('/api/question/allquestion', (req, res) => {
            var token = req.headers['x-access-token'];
            if (!token) {
                return res
                    .status(401)
                    .send({ auth: false, message: 'No token provided.' });
            }
            jwt.verify(token, config.key, (err, decoded) => {
                if (err)
                    return res.status(500).send({
                        auth: false,
                        message: 'Failed to authenticate token.'
                    });
                let id = decoded.locationId;
                this.question
                    .selectAllQuestion(id)
                    .then(data => {
                        return res.status(200).send({
                            data: data,
                            msg: 'success',
                            status: 200
                        });
                    })
                    .catch(error => {
                        return res.status(200).send({
                            data: error,
                            msg: 'fail',
                            status: 400
                        });
                    });
            });
        });
    }
}

export default new QuestionControler().router;
