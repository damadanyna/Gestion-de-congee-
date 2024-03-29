// automatically creating table on startup and inserting data
const sequelize = require("./backend/db_config");
const User = require("./model/profile");
 
// default loading data
sequelize.sync({ force: true }).then(async () => {
  console.log("db is ready... inserting sample data...");
  for (let i = 1; i < 11; i++) {
    const user = {
      id:'',
      name: `user${i}`,
      pwd: `user${i}@automation.com`,
    };
    await User.create(user);
  }
  console.log("sample data inserted...");
});
 
// application
const express = require("express");
const userRoutes = require("./backend/user_route");
 
const app = express();
app.use(express.json());
 
// application routes
app.get("/", ( resp) => resp.send("application is up and running"));
 
app.use("/api", userRoutes.routes);
 
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Service endpoint = http://localhost:${PORT}`);
});