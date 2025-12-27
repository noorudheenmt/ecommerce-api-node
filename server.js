import http from "http";
import app from "./src/app.js";
import connectDB from "#config/db.js";
import config from "#config/config.js";
const PORT = config.PORT;

connectDB(); 

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
