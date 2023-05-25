import db from "./db";
import app from "./app";
import swaggerSetup from "./swagger";

// Initialize Swagger setup
swaggerSetup(app);

// ...

// Start the server after MongoDB connection is established
db.once("open", () => {
  const port = 3000; // Change the port number if needed

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

// ...
