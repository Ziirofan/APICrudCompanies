import { Users, UsersAssociation } from "../../Model/user.model";
import { ExceptionNotFound, ExceptionServerError } from "../../Utils/errorHandler"
import { errorConsole } from "../../Utils/errorConsole"
import { Companies } from "../../Model/companies.model";
import { CompaniesUsers } from '../../Model/userCompanies.model';

import { UserTypes, QueryTypes } from "../../types/types";

export const createUser = async (dataUser: UserTypes, companyId: number) => {
    try{
        const resCompany = await Companies.findByPk(companyId)
        if(!resCompany)
            throw ExceptionNotFound("Company with this id not found");
        const result = await Users.create({
            firstname: dataUser.firstname,
            lastname: dataUser.lastname,
            email_address: dataUser.email_address,
            postal_address: dataUser.postal_address,
            city: dataUser.city,
            country: dataUser.country
        });


        if(result.getDataValue("id")){

            const resAsso = await CompaniesUsers.create({
                    company_id: resCompany.getDataValue("id"), 
                    user_id: result.getDataValue("id")
                }, 
                {
                    fields: ['company_id', 'user_id']
                });

            if(resAsso.getDataValue('company_id')){
                return {
                    status: 200,
                    message: "Data stored",
                    data: {
                        newUserId: result.getDataValue("id")
                    }
                }
            }
            throw ExceptionServerError('Association not stored')
        }
        throw ExceptionServerError('User not stored')
    }
    catch(err){
        errorConsole(err);
    }
}

export const readUser = async (attributesString: string, paramsWhere?: string) => {
    try{
        const attributes = attributesString.split(',')
        // where=firstname:3,
        const query: QueryTypes = {
            attributes,
            include: UsersAssociation,
        }
        if(paramsWhere){
            const params = paramsWhere.split(',').map((elem) => elem.split(':')).map((val) => {return {[val[0]]:val[1]}})
            query.where = params
        }
        const result = await Users.findAll(query)
        return result;
    }
    catch(err){
        errorConsole(err);
    }
}

export const updateUser = async (updateData: UserTypes, userId: number) => {
    try{
        const resUpdate = await Users.update(updateData, {
            where:{
                id: userId
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

export const deleteUser = async (userId: number) => {
    try{
        // Remove association before beacuse of constraint foreign key
        const resultAsso = await CompaniesUsers.destroy({
            where: {
                user_id: userId
            }
        })
        if(resultAsso > 0){
            const result = await Users.destroy({
                where:{
                    id: userId
                }
            })
            if(result > 0){
                return {
                    status: 200,
                    message: 'Data destroy'
                }
            }
            return {
                status: 202,
                message: 'Association removed but user not found'
            } 
        }
        throw ExceptionNotFound("User not found")
    }
    catch(err){
        errorConsole(err);
    }
}