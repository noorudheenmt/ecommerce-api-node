import http from "http";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import config from "./src/config/config.js";
const PORT = config.PORT;

connectDB(); 

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
