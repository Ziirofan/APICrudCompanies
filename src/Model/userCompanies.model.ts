import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from './conn';
import { Companies } from './companies.model';
import { Users } from './user.model';

export const CompaniesUsers = sequelize.define('companies_users',{
    company_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Companies,
            key: 'id'
        }
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    }
});
