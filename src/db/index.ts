// import { status } from './../types/index';
import { Pool } from "pg";
import { config } from "../config";

export const pool = new Pool({
  connectionString: config.database_url,
});

export const initDB = async () => {
  try {
    await pool.query(`
     CREATE TABLE  IF NOT EXISTS users(
     
     id SERIAL PRIMARY KEY,

     name VARCHAR(200) NOT NULL,

     email VARCHAR(200) UNIQUE NOT NULL ,

     password TEXT NOT NULL,

     role VARCHAR(100) NOT NULL DEFAULT 'contributor',

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
     ) 
        `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS issues(
        id SERIAL PRIMARY KEY,

        title VARCHAR(150) NOT NULL,
        description TEXT NOT NULL CHECK (LENGTH(description)>=20),
        type VARCHAR(30) NOT NULL,
        status VARCHAR(30) NOT NULL DEFAULT 'open' 
         CHECK (status IN ('open', 'in_progress', 'resolved')),


         reporter_id INTEGER NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),

         updated_at TIMESTAMP DEFAULT NOW()
        

        )
        
        `);

    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
