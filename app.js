const express = require("express");
const swaggerUi = require("swagger-ui-express");
const { config } = require("dotenv");
const bodyParser = require("body-parser");
const {  } = require("./controllers/error");
const { specs } = require("./utils/swagger-ui");
const cors = require("cors");
const { mongoConnect } = require("./utils/db");
const {
  productRoutes,
  cartRoutes,
  userRoutes,
} = require("./routes");

const result = config();
if (result.error) {
  // If there's an error loading .env file, log the error and exit the process
  console.error("Error loading .env file:", result.error);
  process.exit(1);
}

// Create an Express application
const app = express();

// Define the port to use, defaulting to 3000 if not specified
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// testingConnection();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

mongoConnect(() => {
  console.log("DB Connected!");
  app.listen(port, () => {
    // Log a message indicating that the server is running
    console.log(`Server is running on port ${port}`);
  });
});

app.use("/api", userRoutes);

app.use("/api/products", productRoutes);
app.use("/api", cartRoutes);

app.use(error404);
