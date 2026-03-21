import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "book_review_app",
  user: "katiehardy",
});

export default pool;
