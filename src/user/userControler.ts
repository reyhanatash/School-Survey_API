import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../config';
import User from './user';
import * as Model from './userModel';

class UserControler {
    public router: express.router;
    public user: User;
    constructor() {
        this.router = express.Router();
        this.user = new User();
        this.config();
        this.call();
    }
    private config(): void {
        this.router.use(bodyParser.urlencoded({ extended: true }));
        this.router.use(bodyParser.json());
    }
    private call(): void {
        //api/user/login
        this.router.post('/api/user/createmanager', (req, res) => {
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
                let managerModel = new Model.Manager();

                managerModel.id = req.body.id ? req.body.id : 0;
                managerModel.username = req.body.username;
                managerModel.password = req.body.password;
                if (req.body.locationId === -1) {
                    managerModel.locationId = decoded.locationId;
                } else {
                    managerModel.locationId = req.body.locationId;
                }

                managerModel.type = +req.body.type;
                this.user
                    .createManager(managerModel)
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
        });
        this.router.get('/api/user/getManagers', (req, res) => {
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
                this.user
                    .GetAllManager(id)
                    .then(data => {
                        res.status(200).send({
                            msg: 'success',
                            status: 200,
                            data: data
                        });
                    })
                    .catch(error => {
                        res.status(200).send({
                            msg: 'success',
                            status: 400,
                            data: error
                        });
                    });
            });
        });

        this.router.post('/api/user/deleteManager', (req, res) => {
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
            this.user
                .deleteManager(id)
                .then(data => {
                    return res.status(200).json({
                        data: data,
                        msg: 'success',
                        status: 200
                    });
                })
                .catch(error => {
                    return res.status(200).json({
                        data: error,
                        msg: 'fail',
                        status: 400
                    });
                });
        });
        this.router.post('/api/user/login', (req, res) => {
            var loginModel = new Model.login();
            loginModel.username = req.body.username;
            loginModel.password = req.body.password;
            this.user
                .Login(loginModel)
                .then(data => {
                    if (data[0].RESULT !== 0) {
                        //create token

                        let token = jwt.sign(
                            {
                                id: data[0].RESULT,
                                type: data[0].type,
                                locationId: data[0].LOCATION_CO
                            },
                            config.key,
                            {
                                expiresIn: 31536000
                            }
                        );
                        let k = {
                            token: token,
                            type: data[0].type
                        };
                        res.status(200).send({
                            msg: 'success',
                            data: k,
                            status: 200
                        });
                    } else {
                        res.status(200).send({
                            msg: 'fail',
                            data: '',
                            status: 400
                        });
                    }
                })
                .catch(reason => {
                    res.status(400).send({
                        reason
                    });
                });
        });

        this.router.get('/api/user/getalluser', (req, res) => {
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
                let locationId = decoded.locationId;
                this.user
                    .GetAllUser(-1, locationId)
                    .then(data => {
                        res.status(200).send({
                            data
                        });
                    })
                    .catch(err => {
                        res.status(200).send({
                            err
                        });
                    });
            });
        });
        this.router.post('/api/user/loadevent', (req, res) => {
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
            this.user
                .eventLoad(id)
                .then(data => {
                    return res.status(200).json({
                        data: data,
                        msg: 'success',
                        status: 200
                    });
                })
                .catch(error => {
                    return res.status(200).json({
                        data: error,
                        msg: 'fail',
                        status: 400
                    });
                });
        });
        this.router.post('/api/user/changepass', (req, res) => {
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
                let changepassOData = new Model.ChangePass();
                changepassOData.id = decoded.id;
                changepassOData.newPassword = req.body.newPass;
                changepassOData.password = req.body.pass;
                this.user
                    .changePass(changepassOData)
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
        this.router.post('/api/user/checkName', (req, res) => {
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
                let name = req.body.name;
                this.user
                    .checkName(name)
                    .then(data => {
                        res.status(200).send({
                            msg: 'success',
                            data: data
                        });
                    })
                    .catch(error => {
                        res.status(200).send({
                            msg: 'fail',
                            data: error
                        });
                    });
            });
        });
        this.router.post('/api/user/getinfo', (req, res) => {
            let email = req.body.email;
            let number = req.body.number;
            this.user
                .getInfo(email, number)
                .then(data => {
                    res.status(200).send({
                        msg: 'success',
                        data: data
                    });
                })
                .catch(error => {
                    res.status(200).send({
                        msg: 'fail',
                        data: error
                    });
                });
        });
        this.router.post('/api/user/changeactive', (req, res) => {
            var token = req.headers['x-access-token'];
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
                this.user
                    .changeActive(id, type)
                    .then(data => {
                        res.status(200).send({
                            msg: 'success',
                            data: data
                        });
                    })
                    .catch(error => {
                        res.status(200).send({
                            msg: 'fail',
                            data: error
                        });
                    });
            });
        });
    }
}

export default new UserControler().router;
