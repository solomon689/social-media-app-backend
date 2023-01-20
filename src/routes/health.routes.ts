import { Request, Response, Router } from "express";
import { HttpStatus } from '../common/enums/HttpStatus';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    return res.status(HttpStatus.OK).json({
        uptime: process.uptime(),
        message: 'OK',
        date: new Date(),
    });
});

export default router;