import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from './conn';
import { Users } from './user.model';
import { CompaniesUsers } from './userCompanies.model';

export const Companies = sequelize.define('companies',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    siret: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW')
    },
    city: {
        type: DataTypes.STRING,
    },
    country: {
        type: DataTypes.STRING,
    },
})


