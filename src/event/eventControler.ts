import * as bodyParser from 'body-parser';
import * as express from 'express';
import Event from './event';
import * as Model from './eventModel';
import * as jwt from 'jsonwebtoken';
import config from '../../config';
import DateService from '../services/dateService';

class EventControler {
    public router: express.router;
    public event: Event;
    constructor() {
        this.router = express.Router();
        this.event = new Event();
        this.config();
        this.call();
    }
    config() {
        this.router.use(bodyParser.urlencoded({ extended: true }));
        this.router.use(bodyParser.json());
    }
    call() {
        this.router.post('/api/event/addevent', (req, res) => {
            var token = req.headers['x-access-token'];
            if (!token)
                return res
                    .status(401)
                    .send({ auth: false, message: 'No token provided.' });

            jwt.verify(token, config.key, (err, decoded) => {
                if (err)
                    return res.status(500).send({
                        auth: false,
                        message: 'Failed to authenticate token.'
                    });
                let eventModel = new Model.EventOData();
                eventModel.categoryId = req.body.categoryId;
                eventModel.description = req.body.description;
                eventModel.startDate = req.body.startDate;
                eventModel.endDate = req.body.endDate;
                eventModel.locationId = req.body.locationId;
                eventModel.name = req.body.name;
                eventModel.id = req.body.id ? req.body.id : 0;
                eventModel.userId = decoded.id;
                this.event
                    .AddEvent(eventModel)
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
                            data: '',
                            status: 400
                        });
                    });
            });
        });
        this.router.post('/api/event/deleteevent', (req, res) => {
            var token = req.headers['x-access-token'];
            if (!token)
                return res
                    .status(401)
                    .send({ auth: false, message: 'No token provided.' });

            jwt.verify(token, config.key, (err, decoded) => {
                if (err)
                    return res.status(500).send({
                        auth: false,
                        message: 'Failed to authenticate token.'
                    });
                let id = req.body.id;
                this.event
                    .deleteEvent(id)
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
        this.router.get('/api/event/allEvents', (req, res) => {
            var token = req.headers['x-access-token'];
            if (!token)
                return res
                    .status(401)
                    .send({ auth: false, message: 'No token provided.' });

            jwt.verify(token, config.key, (err, decoded) => {
                if (err)
                    return res.status(500).send({
                        auth: false,
                        message: 'Failed to authenticate token.'
                    });
                let id = decoded.locationId;
                this.event
                    .getallEvents(id)
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
        this.router.get('/api/event/managerevent', (req, res) => {
            var token = req.headers['x-access-token'];
            if (!token)
                return res
                    .status(401)
                    .send({ auth: false, message: 'No token provided.' });

            jwt.verify(token, config.key, (err, decoded) => {
                if (err)
                    return res.status(500).send({
                        auth: false,
                        message: 'Failed to authenticate token.'
                    });
                let id = decoded.id;
                this.event
                    .managerEvent(id)
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
        this.router.get('/api/event/currentEvent', (req, res) => {
            let token = req.headers['x-access-token'];
            if (!token)
                return res
                    .status(401)
                    .send({ auth: false, message: 'No token provided.' });

            jwt.verify(token, config.key, (err, decoded) => {
                if (err)
                    return res.status(500).send({
                        auth: false,
                        message: 'Failed to authenticate token.'
                    });
                let id = decoded.id;
                this.event
                    .currentEvent(id)
                    .then(data => {
                        if (
                            data[0]['message'] === 0 ||
                            data[0]['message'] === -1
                        ) {
                            return res.status(200).send({
                                msg: 'success',
                                data: data[0],
                                status: 200
                            });
                        }
                        for (let i = 0; i < data['length']; i++) {
                            let sum =
                                data[i]['ANSWER1'] +
                                data[i]['ANSWER2'] +
                                data[i]['ANSWER3'] +
                                data[i]['ANSWER4'] +
                                data[i]['ANSWER5'];

                            data[i]['pANSWER1'] = (
                                (data[i]['ANSWER1'] / sum) *
                                100
                            ).toFixed(2);
                            data[i]['pANSWER2'] = (
                                (data[i]['ANSWER2'] / sum) *
                                100
                            ).toFixed(2);
                            data[i]['pANSWER3'] = (
                                (data[i]['ANSWER3'] / sum) *
                                100
                            ).toFixed(2);
                            data[i]['pANSWER4'] = (
                                (data[i]['ANSWER4'] / sum) *
                                100
                            ).toFixed(2);
                            data[i]['pANSWER5'] = (
                                (data[i]['ANSWER5'] / sum) *
                                100
                            ).toFixed(2);
                        }
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
        this.router.post('/api/event/reportEvent', (req, res) => {
            let token = req.headers['x-access-token'];
            if (!token)
                return res
                    .status(401)
                    .send({ auth: false, message: 'No token provided.' });

            jwt.verify(token, config.key, (err, decoded) => {
                if (err)
                    return res.status(401).send({
                        auth: false,
                        message: 'Failed to authenticate token.'
                    });
                let id = req.body.id;
                let type = req.body.type;
                let start = req.body.start.split('-');
                let end = req.body.end.split('-');
                let result = [];
                if (start.length !== 3 || end.length !== 3) {
                    return res.status(200).send({
                        msg: 'bad request',
                        status: 400
                    });
                }
                //set format yyyy-mm-hh
                let ms = start[1].length === 1 ? '0' + start[1] : start[1];
                let ds = start[2].length === 1 ? '0' + start[2] : start[2];

                let me = end[1].length === 1 ? '0' + end[1] : end[1];
                let de = end[2].length === 1 ? '0' + end[2] : end[2];

                let sf = start[0] + '-' + ms + '-' + ds;
                let ef = end[0] + '-' + me + '-' + de;

                //type = 1 Daily
                //type = 2 Weekly
                //type = 3 Monthly
                //type = 4 Yearly
                this.event
                    .RateAvreage(id, type, sf, ef)
                    .then(data => {
                        result = DateService.groupQuestions(
                            new Date(sf),
                            new Date(ef),
                            type,
                            data
                        );

                        res.status(200).send({
                            msg: 'success',
                            data: result,
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
                // switch (type) {
                //     case '1':

                //         break;
                //     case '2':

                //         break;
                //     case '3':

                //         break;
                //     case '4':

                //         break;
                //     default:
                //         result = [];
                // }
                // return res.status(200).send({
                //     msg: 'success',
                //     status: 200,
                //     data: result
                // });
            });
        });
    }
}

export default new EventControler().router;
