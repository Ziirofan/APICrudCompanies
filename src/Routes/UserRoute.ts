import Express  from "express"
import { runAsyncWrapper } from "../Utils/runAsyncWrapper"
import { readUser, createUser, updateUser, deleteUser } from "../Controllers/Users/User"

export default function UserRoute (app: Express.Application): void{

    app.get('/users', runAsyncWrapper( async(req: any, res: Express.Response) => {
        const result = await readUser(req.query.attributes)
        res.json(result);
    }))

    app.get('/user', runAsyncWrapper( async(req: any, res: Express.Response) => {
        const result = await readUser(req.query.attributes, req.query.where)
        return res.json(result);
    }))

    app.post('/user', runAsyncWrapper( async(req: any, res: Express.Response) => {
        const result = await createUser(req.body.dataUser, req.body.companyId)
        return res.status(result!.status).json(result)
    }))

    app.put('/user', runAsyncWrapper( async(req: any, res: Express.Response) => {
        const result = await updateUser(req.body.dataUser, req.body.companyId)
        return res.status(result!.status).json(result)
    }))

    app.delete('/user', runAsyncWrapper( async(req: any, res: Express.Response) => {
        const result = await deleteUser(req.query.userId)
        return res.status(result!.status).json(result)
    }))
}