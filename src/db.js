import pg from 'pg';
import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const pgp = pgPromise();

// Verifica si DATABASE_URL existe (modo Render)
const isProduction = process.env.NODE_ENV === 'production';
const connectionString = process.env.DATABASE_URL;

let config;

if (connectionString) {
  // Usar DATABASE_URL (Render)
  config = {
    connectionString,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
  };
} else {
  // Usar configuración por variables separadas (local)
  config = {
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DBPORT,
  };
}

export const pool = new pg.Pool(config);
export const pgpConnection = pgp({
  ...config,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

// 👉 Establecer el esquema por defecto
pgpConnection.none('SET search_path TO gestiona')
  .catch(error => {
    console.error('Error setting search_path:', error);
  });