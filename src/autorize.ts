import * as jwt from 'jsonwebtoken';
import config from '../config';

export class AutorizeChecker {
    public static checktoken(token) {
        var res = new AutorizeModel();
        if (!token) {
            res.code = 401;
            res.msg = 'No token provided.';
            res.isvalid = false;
            return res;
        }
        jwt.verify(token, config.key, (err, decoded) => {
            if (err) {
                res.code = 500;
                res.msg = 'Failed to authenticate token.';
                res.isvalid = false;
                return res;
            } else {
                res.code = 200;
                res.isvalid = true;
                return res;
            }
        });
    }
}

export class AutorizeModel {
    public isvalid: boolean;
    public code;
    public msg: string;
    public id;
}
