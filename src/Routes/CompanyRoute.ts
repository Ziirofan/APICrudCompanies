import Express  from "express"
import { runAsyncWrapper } from "../Utils/runAsyncWrapper"
import { readCompany, createCompany, updateCompany, deleteCompany } from "../Controllers/Companies/Company"

export default function CompanyRoute (app: Express.Application): void{

    app.get('/companies', runAsyncWrapper( async(req: any, res: Express.Response) => {
        const result = await readCompany(req.query.attributes)
        res.json(result);
    }))

    app.get('/company', runAsyncWrapper( async(req: any, res: Express.Response) => {
        const result = await readCompany(req.query.attributes, req.query.where)
        return res.json(result);
    }))

    app.post('/company', runAsyncWrapper( async(req: any, res: Express.Response) => {
        const result = await createCompany(req.body.dataCompany)
        return res.status(result!.status).json(result)
    }))

    app.put('/company', runAsyncWrapper( async(req: any, res: Express.Response) => {
        const result = await updateCompany(req.body.dataCompany, req.body.companyId)
        return res.status(result!.status).json(result)
    }))

    app.delete('/company', runAsyncWrapper( async(req: any, res: Express.Response) => {
        const result = await deleteCompany(req.query.companyId)
        return res.status(result!.status).json(result)
    }))
}