import Express  from "express"
import { runAsyncWrapper } from "../Utils/runAsyncWrapper"
import { createCompUserAsso, deleteCompUserAsso } from "../Controllers/UsersCompaniesAsso/UsersCompaniesAsso"

export default function CompanyUserRoute (app: Express.Application): void{


    app.post('/assoUserCompany', runAsyncWrapper( async(req: any, res: Express.Response) => {
        console.log(req)
        const result = await createCompUserAsso(req.body.dataAsso)
        return res.status(result!.status).json(result)
    }))

    app.delete('/assoUserCompany', runAsyncWrapper( async(req: any, res: Express.Response) => {
        const result = await deleteCompUserAsso(req.query.companyId, req.query.userId)
        return res.status(result!.status).json(result)
    }))
}