import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as sha256 from 'sha256';
import * as jwt from 'jsonwebtoken';
import config from '../../config';
import Category from './category';
import * as Model from './categoryModel';

class CategoryControler {
    public router: express.router;
    public category: Category;
    constructor() {
        this.router = express.Router();
        this.category = new Category();
        this.config();
        this.call();
    }
    private config(): void {
        this.router.use(bodyParser.urlencoded({ extended: true }));
        this.router.use(bodyParser.json());
    }
    private call(): void {
        //api/category/addcategory
        this.router.post('/api/category/addcategory', (req, res) => {
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
                var createCategory = new Model.categoryOData();
                createCategory.description = req.body.description;
                createCategory.name = req.body.name;
                createCategory.locaionId = decoded.locationId;
                this.category
                    .addCategory(createCategory)
                    .then(data => {
                        res.status(200).send({
                            status: 200,
                            data: data,
                            msg: 'success'
                        });
                    })
                    .catch(err => {
                        res.status(200).send({
                            status: 400,
                            data: err,
                            msg: 'fail'
                        });
                    });
            });
        });

        //api/category/updatecategory
        this.router.post('/api/category/updatecategory', (req, res) => {
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
                var createCategory = new Model.categoryOData();
                createCategory.id = req.body.id;
                createCategory.description = req.body.description;
                createCategory.name = req.body.name;
                createCategory.locaionId = decoded.locationId;
                this.category
                    .updateCategory(createCategory)
                    .then(data => {
                        res.status(200).send({
                            status: 200,
                            data: data,
                            msg: 'success'
                        });
                    })
                    .catch(err => {
                        res.status(200).send({
                            status: 400,
                            data: err,
                            msg: 'fail'
                        });
                    });
            });
        });

        //api/category/allcategory
        this.router.get('/api/category/allcategory', (req, res) => {
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
                this.category
                    .selectAllCategory(id)
                    .then(data => {
                        res.status(200).send({
                            status: 200,
                            data: data,
                            msg: 'success'
                        });
                    })
                    .catch(err => {
                        res.status(200).send({
                            status: 200,
                            data: err,
                            msg: 'success'
                        });
                    });
            });
        });

        //api/category/deletecategory
        this.router.post('/api/category/deletecategory', (req, res) => {
            var token = req.headers['x-access-token'];
            let id;
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
                id = req.body.id;
                this.category
                    .deleteCategory(id)
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

        //api/category/updatecategory
        this.router.post('/api/category/updatecategory', (req, res) => {});
    }
}

export default new CategoryControler().router;
