// imports node modules
import { Request, Response, Router } from 'express';

// imports models
import Post from "../models/Post";

class PostRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async getPost(req: Request, res: Response): Promise<void> {
        let post = await Post.findOne({url: req.params.url})
        res.json({ post });
    }

    public async getPosts(req: Request, res: Response): Promise<void> {
        let posts = await Post.find();
        res.json(posts);
    }

    public async createPost(req: Request, res: Response): Promise<void> {
        let { title, url, content, image } = req.body
        let newPost = new Post({
            title,
            url,
            content,
            image
        }); 
        await newPost.save();
        res.json({data: newPost});
    }

    public async updatePost(req: Request, res: Response): Promise<void> {
        let { url } = req.params;

        let postUpdated = await Post.findOneAndUpdate({ url }, req.body, { new: true });

        res.json({ postUpdated });

    }

    public async deletePost(req: Request, res: Response): Promise<void>{
        let { url } = req.params;

        let postDeleted = await Post.findOneAndDelete({ url })

        res.json({ "response": "Post deleted successfully" });

    }

    routes() {
        this.router.get('/', this.getPosts);
        this.router.get('/:url', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:url', this.updatePost);
        this.router.delete('/:url', this.deletePost);
    }
}

const postRouter = new PostRouter();

export default postRouter.router;