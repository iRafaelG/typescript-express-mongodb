// imports node modules
import { Request, Response, Router } from 'express';

// imports models
import User from "../models/User";

class UserRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async getUser(req: Request, res: Response): Promise<void> {
        let user = await User.findOne({username: req.params.username}).populate('posts', 'title url -_id');
        res.json({ user });
    }

    public async getUsers(req: Request, res: Response): Promise<void> {
        let users = await User.find();
        res.json(users);
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        let newUser = new User(req.body); 
        await newUser.save();
        res.json({data: newUser});
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        let { username } = req.params;

        let userUpdated = await User.findOneAndUpdate({ username }, req.body, { new: true });

        res.json({ userUpdated });

    }

    public async deleteUser(req: Request, res: Response): Promise<void>{
        let { username } = req.params;

        let userDeleted = await User.findOneAndDelete({ username })

        res.json({ "response": "User deleted successfully" });

    }

    routes() {
        this.router.get('/', this.getUsers);
        this.router.get('/:username', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:username', this.updateUser);
        this.router.delete('/:username', this.deleteUser);
    }
}

const userRouter = new UserRouter();

export default userRouter.router;