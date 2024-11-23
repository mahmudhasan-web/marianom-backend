import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  jwt: {
    secret_key: process.env.JWT_SECRET_KEY,
  },
};
