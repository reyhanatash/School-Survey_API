import * as express from 'express';
import user from './user/userControler';
import device from './device/devicecontroler';
import category from './category/categoryControler';
import question from './question/questinControler';
import location from './location/locationControler';
import event from './event/eventControler';
import eventDevice from './eventDevice/eventDeviceControler';
class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use(function(req, res, next) {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader(
                'Access-Control-Allow-Methods',
                'GET, POST, OPTIONS, PUT, PATCH, DELETE'
            );

            // Request headers you wish to allow
            res.setHeader(
                'Access-Control-Allow-Headers',
                'X-Requested-With,content-type,x-access-token'
            );

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);

            // Pass to next layer of middleware
            next();
        });
        this.app.use(user);
        this.app.use(device);
        this.app.use(category);
        this.app.use(location);
        this.app.use(event);
        this.app.use(question);
        this.app.use(eventDevice);
    }
}

export default new App().app;
