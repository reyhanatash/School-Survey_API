import * as bodyParser from 'body-parser';
import * as express from 'express';
import EventDevice from './eventDevice';
import User from 'user/user';
import * as Model from './eventDeviceModel';
import * as jwt from 'jsonwebtoken';
import config from '../../config';

class EventDeviceControler {
    public router: express.router;
    public eventDevice: EventDevice;
    constructor() {
        this.router = express.Router();
        this.eventDevice = new EventDevice();
        this.config();
        this.call();
    }
    private config(): void {
        this.router.use(bodyParser.urlencoded({ extended: true }));
        this.router.use(bodyParser.json());
    }
    private call(): void {
        this.router.post('/api/eventdevice/createeventdevice', (req, res) => {
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
            });
            let eventDeviceModel = new Model.EventDeviceOData();
            eventDeviceModel.deviceId = req.body.deviceId;
            eventDeviceModel.eventId = req.body.eventId;
            this.eventDevice
                .CreateEventDevice(eventDeviceModel)
                .then(data => {
                    res.status(200).send({
                        status: 200,
                        data: data,
                        msg: 'success'
                    });
                })
                .catch(error => {
                    res.status(200).send({
                        status: 400,
                        data: error,
                        msg: 'fail'
                    });
                });
        });
        this.router.post('/api/eventdevice/deleteeventdevice', (req, res) => {
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
            });
            let id = req.body.id;

            this.eventDevice
                .deleteEventDevice(id)
                .then(data => {
                    res.status(200).send({
                        status: 200,
                        data: data,
                        msg: 'success'
                    });
                })
                .catch(error => {
                    res.status(200).send({
                        status: 400,
                        data: error,
                        msg: 'fail'
                    });
                });
        });
        this.router.post('/api/eventdevice/selectevent', (req, res) => {
            let serialNo = req.body.serialNo;
            if (!serialNo) {
                return res.status(200).send({
                    status: 400,
                    data: '',
                    msg: 'No serial Provided'
                });
            }
            this.eventDevice
                .SelectEventDeviceBySerialNum(serialNo)
                .then(data => {
                    res.status(200).send({
                        status: 200,
                        data: data,
                        msg: 'success'
                    });
                })
                .catch(error => {
                    res.status(200).send({
                        status: 400,
                        data: error,
                        msg: 'fail'
                    });
                });
        });
        this.router.post('/api/eventdevice/selectdevicebyevent', (req, res) => {
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
            });
            let eventId = req.body.eventId;

            this.eventDevice
                .selectDiveByEvent(eventId)
                .then(data => {
                    res.status(200).send({
                        status: 200,
                        data: data,
                        msg: 'success'
                    });
                })
                .catch(error => {
                    res.status(200).send({
                        status: 400,
                        data: error,
                        msg: 'fail'
                    });
                });
        });
        this.router.post('/api/eventdevice/deletedevicebyevent', (req, res) => {
            let token = req.headers['x-access-token'];
            if (!token) {
                return res.status(401).send({
                    auth: false,
                    message: 'No token provided.'
                });
            }
            jwt.verify(token, config.key, (err, decoded) => {
                if (err)
                    return res.status(500).send({
                        auth: false,
                        message: 'Failed to authenticate token.'
                    });
                let eventId = req.body.eventId;
                this.eventDevice.deleteEventDevicebyEventId(eventId).then(
                    data => {
                        res.status(200).send({
                            data: data,
                            msg: 'success',
                            status: 200
                        });
                    })
                    .catch(error=>{
                    error => {
                        res.status(200).send({
                            data: error,
                            msg: 'fail',
                            status: 400
                        });
                    }
                });
            });
        });
        this.router.post('/api/eventdevice/answer', (req, res) => {
            let answerModel = new Model.AnswerOData();
            answerModel.serialNo = req.body.serialNo;
            answerModel.answer = req.body.answer;
            answerModel.devoceId = req.body.deviceId;
            answerModel.questionId = req.body.questionId;
            answerModel.eventId = req.body.eventId;

            this.eventDevice
                .createAnswer(answerModel)
                .then(data => {
                    res.status(200).send({
                        status: 200,
                        data: data,
                        msg: 'success'
                    });
                })
                .catch(error => {
                    res.status(200).send({
                        status: 400,
                        data: error,
                        msg: 'fail'
                    });
                });
        });
        this.router.post('/api/eventdevice/getresult', (req, res) => {
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
            });
            let id = req.body.eventId;

            this.eventDevice
                .getResult(id)
                .then(data => {
                    res.status(200).send({
                        status: 200,
                        data: data,
                        msg: 'success'
                    });
                })
                .catch(error => {
                    res.status(200).send({
                        status: 400,
                        data: error,
                        msg: 'fail'
                    });
                });
        });
        this.router.post('/api/eventdevice/getresultrange', (req, res) => {
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
            });
            let id = req.body.eventId;
            let start = req.body.start;
            let end = req.body.end;

            this.eventDevice
                .getResultByRange(id, start, end)
                .then(data => {
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
                        status: 200,
                        data: data,
                        msg: 'success'
                    });
                })
                .catch(error => {
                    res.status(200).send({
                        status: 400,
                        data: error,
                        msg: 'fail'
                    });
                });
        });
        this.router.post('/api/eventdevice/createRent', (req, res) => {
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
            });
            let rentModel = new Model.Rent();
            rentModel.Id = req.body.id;
            rentModel.StartDate = req.body.start;
            rentModel.EndDate = req.body.end;
            rentModel.LocationId = req.body.locationId;
            rentModel.Devices = req.body.devices;
            let id = req.body.eventId;
            let start = req.body.start;
            let end = req.body.end;

            this.eventDevice
                .createRent(rentModel)
                .then(data => {
                    res.status(200).send({
                        status: 200,
                        data: data,
                        msg: 'success'
                    });
                })
                .catch(error => {
                    res.status(200).send({
                        status: 400,
                        data: error,
                        msg: 'fail'
                    });
                });
        });
        this.router.post('/api/eventdevice/deleteRent', (req, res) => {
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
            });
            let id = req.body.rentId;

            this.eventDevice
                .deleteRent(id)
                .then(data => {
                    res.status(200).send({
                        status: 200,
                        data: data,
                        msg: 'success'
                    });
                })
                .catch(error => {
                    res.status(200).send({
                        status: 400,
                        data: error,
                        msg: 'fail'
                    });
                });
        });
        this.router.get('/api/eventdevice/selectRents', (req, res) => {
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
            });

            this.eventDevice
                .selectRents()
                .then(data => {
                    res.status(200).send({
                        status: 200,
                        data: data,
                        msg: 'success'
                    });
                })
                .catch(error => {
                    res.status(200).send({
                        status: 400,
                        data: error,
                        msg: 'fail'
                    });
                });
        });
        this.router.post('/api/eventdevice/eventinfo', (req, res) => {
            let serialNo = req.body.serialNo;
            if (!serialNo) {
                return res.status(200).send({
                    status: 400,
                    data: '',
                    msg: 'No serial Provided'
                });
            }
            this.eventDevice
                .selectEventInfo(serialNo)
                .then(data => {
                    res.status(200).send({
                        status: 200,
                        data: data,
                        msg: 'success'
                    });
                })
                .catch(error => {
                    res.status(200).send({
                        status: 400,
                        data: error,
                        msg: 'fail'
                    });
                });
        });
        this.router.post('/api/eventdevice/resultrange', (req, res) => {
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
            });
            let id = req.body.id;
            let type = req.body.type;
            let count = req.body.count ? req.body.count : 1;
            let end: Date = req.body.end ? req.body.end : new Date();
            let start: Date = new Date();
            switch (type) {
                case 'h':
                    start.setHours(end.getHours() - count);
                    break;
                case 'd':
                    start.setDate(end.getDate() - count);
                    break;
                case 'w':
                    start.setDate(end.getDate() - count * 7);
                    break;
                case 'm':
                    start.setDate(end.getDate() - count * 30);
                    break;
                case 'a':
                    start.setMonth(end.getMonth() - 120);
                    break;
                case 'y':
                    start.setMonth(end.getMonth() - count * 12);
                    break;
            }
            this.eventDevice
                .getResultByRange(id, start, end)
                .then(data => {
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
                        status: 200,
                        data: data,
                        msg: 'success'
                    });
                })
                .catch(error => {
                    res.status(200).send({
                        status: 400,
                        data: error,
                        msg: 'fail'
                    });
                });
        });
    }
}

export default new EventDeviceControler().router;
