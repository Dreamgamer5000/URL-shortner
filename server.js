const app = require("./app");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
  });
});
