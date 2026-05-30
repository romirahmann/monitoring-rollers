import "dotenv/config";
import app from "./src/app.js";

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await app.listen({
      port: parseInt(PORT),
      host: "0.0.0.0",
    });
    console.log(`
    🚀 Incorest ERP System Started!
    ---------------------------------
    Environment : development
    Port        : ${PORT}
    URL         : http://localhost:${PORT}
    ---------------------------------
    `);
  } catch (error) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
