import { Sequelize, DataTypes } from 'sequelize';
import { Companies } from './companies.model';
import { CompaniesUsers } from './userCompanies.model';
import { sequelize } from './conn';

export const Users = sequelize.define('users',{
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postal_address: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    country: {
        type: DataTypes.STRING,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW')
    }
    },
    {
        freezeTableName: true,
    })
export const UsersAssociation = Users.belongsToMany(Companies, {as: 'ProviderCompanies',through: CompaniesUsers, foreignKey: "user_id"});
export const CompaniesAssociation = Companies.belongsToMany(Users, {as: 'UsersProvider',through: CompaniesUsers, foreignKey: "company_id"})