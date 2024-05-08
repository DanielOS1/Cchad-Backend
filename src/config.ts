import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    nodemailer: {
      mailUser: process.env.EMAIL_USER,
      mailPass: process.env.EMAIL_PASSWORD,
    },
    postgres: {
      dbName: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
    },
    JwtSecret: process.env.JWT_SECRET,
  };
});
