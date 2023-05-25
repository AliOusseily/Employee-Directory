import mongoose from "mongoose";

const uri = "mongodb://localhost:27017/employeedb"; // Replace with your MongoDB connection string

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Create the User model
const UserModel = mongoose.model("User", userSchema);

// Export the User model
export { UserModel };

// Export the mongoose connection
export default mongoose.connection;
