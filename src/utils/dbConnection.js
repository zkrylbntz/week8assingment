// You can set up your connection string and your pool in here
import pg from "pg";

function connect() {
  const dbConnectionString = process.env.NEXT_PUBLIC_DATABASE_URL;
  const db = new pg.Pool({
    connectionString: dbConnectionString,
  });
  return db;
}

// I am going to export the connect() function to use it in other locations
export const db = connect();
