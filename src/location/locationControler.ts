import * as bodyParser from 'body-parser';
import * as express from 'express';
import Location from './location';
import * as Model from './locationModel';
import * as jwt from 'jsonwebtoken';
import config from '../../config';

class LocationControler {
    public router: express.router;
    public location: Location;
    constructor() {
        this.router = express.Router();
        this.location = new Location();
        this.config();
        this.call();
    }
    config() {
        this.router.use(bodyParser.urlencoded({ extended: true }));
        this.router.use(bodyParser.json());
    }
    call() {
        this.router.post('/api/location/addlocation', (req, res) => {
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
                let locationModel = new Model.LocationOData();
                locationModel.description = req.body.description;
                locationModel.name = req.body.name;
                locationModel.id = req.body.id ? req.body.id : 0;
                this.location
                    .AddLocation(locationModel)
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
        this.router.post('/api/location/deletelocation', (req, res) => {
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
                this.location
                    .DeleteLocation(id)
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
        this.router.get('/api/location/alllocation', (req, res) => {
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
                this.location
                    .LoadAllLocation(id)
                    .then(data => {
                        res.status(200).send({
                            msg: 'success',
                            data: data,
                            status: 200
                        });
                    })
                    .catch(error => {
                        res.status(400).send({
                            msg: 'fail',
                            data: '',
                            status: 400
                        });
                    });
            });
        });
        this.router.post('/api/location/checkName', (req, res) => {
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
                this.location
                    .checkLocationName(name)
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
    }
}

export default new LocationControler().router;
