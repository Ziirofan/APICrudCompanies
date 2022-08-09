import { ExceptionNotFound, ExceptionRequestError, ExceptionServerError } from "../../Utils/errorHandler"
import { errorConsole } from "../../Utils/errorConsole"
import { CompaniesUsers } from '../../Model/userCompanies.model';
import { AssoCompUserTypes } from "../../types/types";

export const createCompUserAsso = async (dataAsso: AssoCompUserTypes) => {
    try{
        const result = await CompaniesUsers.create({
            company_id: dataAsso.company_id,
            user_id: dataAsso.user_id,
        });
        if(result.getDataValue('company_id'))
            return {
                status: 200,
                message: "Data stored",
            }
        throw ExceptionServerError('Association not stored')
    }
    catch(err){
        errorConsole(err);
    }
}

export const deleteCompUserAsso = async (company_id: number, user_id: number) => {
    try{
        // Remove association before beacuse of constraint foreign key
        const resultAsso = await CompaniesUsers.destroy({
            where: {
                company_id,
                user_id
            }
        })
        if(resultAsso > 0){
            return {
                status: 200,
                message: 'Data destroy'
            }
        }
        throw ExceptionNotFound("Association not found")
    }
    catch(err){
        errorConsole(err);
    }
}