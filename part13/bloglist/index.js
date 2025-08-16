import dotenv from 'dotenv';
import { QueryTypes, Sequelize } from 'sequelize';
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    const blogs = await sequelize.query("SELECT * FROM blogs", {
      type:
        QueryTypes.SELECT
    });
    console.log(blogs);
    sequelize.close();
  } catch (error) {
    console.error('Unable to connect to server:', error);
  }
}

main();
