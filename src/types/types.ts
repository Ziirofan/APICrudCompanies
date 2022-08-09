import { BelongsToMany } from "sequelize/types";

export interface UserTypes {
    firstname?: string;
    lastname?: string;
    email_address?: string;
    postal_address?: string;
    city?: string;
    country?: string;
}

export interface CompanyTypes {
    name?: string,
    siret?: number,
    city?: string,
    country?: string
}

export interface AssoCompUserTypes {
    company_id: number,
    user_id: number,
}

export interface QueryTypes{
    attributes?:string[];
    where?:{
        [x: string]: string;
    }[]
    include:BelongsToMany
}