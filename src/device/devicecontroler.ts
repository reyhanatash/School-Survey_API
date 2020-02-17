import * as bodyParser from 'body-parser';
import * as express from 'express';
import Device from './device';
import User from 'user/user';
import * as Model from './deviceModel';
import * as jwt from 'jsonwebtoken';
import config from '../../config';

class deviceControler {
    public router: express.router;
    public device: Device;
    constructor() {
        this.router = express.Router();
        this.device = new Device();
        this.config();
        this.call();
    }
    private config(): void {
        this.router.use(bodyParser.urlencoded({ extended: true }));
        this.router.use(bodyParser.json());
    }
    private call(): void {
        //api/device/adddevice
        this.router.post('/api/device/adddevice', (req, res) => {
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
                let deviceModel = new Model.deviceOData();
                deviceModel.id = req.body.id ? req.body.id : 0;
                deviceModel.description = req.body.description;
                deviceModel.PropertyNo = req.body.propertyNo;
                deviceModel.serialNo = req.body.serialNo;
                this.device
                    .AddDevice(deviceModel)
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
                            data: '',
                            msg: 'fail'
                        });
                    });
            });
        });

        this.router.get('/api/device/allDevieces', (req, res) => {
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
                this.device
                    .GetAllDevieses(id)
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
                            data: '',
                            msg: 'fail'
                        });
                    });
            });
        });
        this.router.post('/api/device/deleteDevice', (req, res) => {
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
                this.device
                    .DeleteDevice(id)
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
                            data: '',
                            msg: 'fail'
                        });
                    });
            });
        });
        this.router.get('/api/device/availableDevieces', (req, res) => {
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
                this.device
                    .GetAvailableDevieses()
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
                            data: '',
                            msg: 'fail'
                        });
                    });
            });
        });
    }
}

export default new deviceControler().router;
