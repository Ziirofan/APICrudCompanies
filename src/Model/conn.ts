import { Sequelize } from 'sequelize';

/*export const sequelize = new Sequelize(process.env.NAME_DB!, process.env.USER_DB!, process.env.PASS_DB!, {
    host: process.env.HOST_DB,
    port: parseInt(process.env.PORT_DB!, 10),
    dialect: 'mysql'
})*/

export const sequelize = new Sequelize('test', 'user', 'test', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    logging: true,
    define: {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    },
})



export const Connection = async () => { 
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return sequelize;
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}