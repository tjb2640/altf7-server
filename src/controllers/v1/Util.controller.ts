import { Request, Response, Router } from 'express'
import path from 'path'

/**
 * Mildly useless stuff
 */
class UtilController {
    private path: string = '/util'
    private router: Router

    constructor() {
        this.router = Router()
        this.initializeRouting()
    }

    public initializeRouting() {
        this.router.get(path.join(this.path, 'xp', ':level'), async (req: Request, res: Response) => {
            await this.get_xpAtLevel(req, res)
        })

        this.router.get(path.join(this.path, 'level', ':xp'), async (req: Request, res: Response) => {
            await this.get_levelAtXp(req, res)
        })
    }
    
    public getRouter(): Router {
        return this.router
    }

    /**
     * Path param Level - spit back XP at that level
     * @param req 
     * @param res 
     */
    public async get_xpAtLevel(req: Request, res: Response) {
        const level = parseInt(req.params['level'], 10)
        res.send({
            xp: level * (level + 1) * 2.5
        }).status(200).end()
    }

    /**
     * Path param XP - spit back level at that XP including increments
     * @param req 
     * @param res 
     */
    public async get_levelAtXp(req: Request, res: Response) {
        const xp = parseInt(req.params['xp'], 10)
        res.send({
            level: 0.5 * (Math.sqrt(1 + (8/5 * xp)) - 1)
        }).status(200).end()
    }
}

export default UtilController
