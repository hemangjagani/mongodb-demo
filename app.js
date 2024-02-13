const express = require('express');
const swaggerUi = require("swagger-ui-express");
const { config } = require('dotenv');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/product');
const shopRoutes = require('./routes/shop');
const cartRoutes = require('./routes/cart');
const { error404 } = require('./controllers/error');
const { specs } = require('./utils/swagger-ui');

// Configure dotenv to load environment variables from .env file
const result = config();

if (result.error) {
    // If there's an error loading .env file, log the error and exit the process
    console.error('Error loading .env file:', result.error);
    process.exit(1);
}

// Create an Express application
const app = express();

// Define the port to use, defaulting to 3000 if not specified
const port = process.env.PORT || 3000;


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// Use the routes for requests to the root path

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api',productRoutes);
app.use('/api',shopRoutes);
app.use("/api",cartRoutes);

app.use(error404)

// Start the server and listen on the specified port
app.listen(port, () => {
    // Log a message indicating that the server is running
    console.log(`Server is running on port ${port}`);
});
