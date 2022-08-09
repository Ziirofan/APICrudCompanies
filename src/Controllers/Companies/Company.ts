import { CompaniesAssociation } from "../../Model/user.model";
import { ExceptionNotFound, ExceptionRequestError, ExceptionServerError } from "../../Utils/errorHandler"
import { errorConsole } from "../../Utils/errorConsole"
import { Companies } from "../../Model/companies.model";
import { CompaniesUsers } from '../../Model/userCompanies.model';

import { CompanyTypes, QueryTypes } from "../../types/types";

export const createCompany = async (dataCompany: CompanyTypes) => {
    try{
        const result = await Companies.create({
            name: dataCompany.name,
            siret: dataCompany.siret,
            city: dataCompany.city,
            country: dataCompany.country,
        });

        if(result.getDataValue("id")){
            return {
                status: 200,
                message: "Data stored",
                data: {
                    newCompanyId: result.getDataValue("id")
                }
            }
        }
        throw ExceptionServerError('Company not stored')
    }
    catch(err){
        errorConsole(err);
    }
}

export const readCompany = async (attributesString: string, paramsWhere?: string) => {
    try{
        const attributes = attributesString.split(',')
        // where=firstname:3,
        const query: QueryTypes = {
            attributes,
            include: CompaniesAssociation,
        }
        if(paramsWhere){
            const params = paramsWhere.split(',').map((elem) => elem.split(':')).map((val) => {return {[val[0]]:val[1]}})
            query.where = params
        }
        const result = await Companies.findAll(query)
        return result;
    }
    catch(err){
        errorConsole(err);
    }
}

export const updateCompany = async (updateData: CompanyTypes, companyId: number) => {
    try{
        const resUpdate = await Companies.update(updateData, {
            where:{
                id: companyId
            }
        })
        if(resUpdate[0] > 0){
            return {
                status: 200,
                message: 'Data updated'
            }
        }
    }
    catch(err){
        errorConsole(err);
    }
}

export const deleteCompany = async (companyId: number) => {
    try{
        // Remove association before beacuse of constraint foreign key
        const resultAsso = await CompaniesUsers.destroy({
            where: {
                company_id: companyId
            }
        })
        
        const result = await Companies.destroy({
            where:{
                id: companyId
            }
        })
        if(resultAsso > 0 ){
            if(result > 0){
                return {
                    status: 200,
                    message: 'Data destroy'
                }
            }
            return {
                status: 202,
                message: 'Association removed but company not found'
            }
        }
        if(result > 0){
            return {
                status: 200,
                message: 'None Association found, Data Removed'
            }
        }
        throw ExceptionNotFound("Company not found")
    }
    catch(err){
        errorConsole(err);
    }
}