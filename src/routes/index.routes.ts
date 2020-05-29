// imports node modules
import { Request, Response, Router } from "express";

class IndexRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', (req: Request, res: Response) => {
            res.send('API: /api/posts')
        });
    }
}

const indexRouter = new IndexRouter;

export default indexRouter.router

