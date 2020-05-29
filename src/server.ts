// imports node modules
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

// imports database files
import db from './database/init.mongo';

// imports routes files
import indexRouter from './routes/index.routes';
import postRouter from "./routes/posts.routes";
import userRouter from "./routes/users.routes";

class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.start();
    }

    config() {

        // db
        db();

        // setting
        this.app.set('port', process.env.PORT || 3000);

        // middleware
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    routes() {
        this.app.use(indexRouter);
        this.app.use('/api/posts', postRouter);
        this.app.use('/api/users', userRouter);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        })
    }
}

const server = new Server();
//server.start();