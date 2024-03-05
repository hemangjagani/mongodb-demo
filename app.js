const express = require("express");
const swaggerUi = require("swagger-ui-express");
const { config } = require("dotenv");
const bodyParser = require("body-parser");
const { error404 } = require("./controllers/error");
const { specs } = require("./utils/swagger-ui");
const cors = require("cors");
const { sequelize, testingConnection } = require("./utils/db");
const {
  productRoutes,
  cartRoutes,
  userRoutes,
} = require("./routes");
const { Product, User, Cart, CartItem, Order, OrderItem } = require("./models");

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

testingConnection();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api", userRoutes);
app.use(async (req, res, next) => {
  const userId = req.body.userId || req.query.userId;
  console.log("###userId", userId);
  const user = await User.findByPk(userId);
  console.log("###user", user);
  if (!!user) {
    req.user = user;
    next();
  } else {
    res.status(401).send("UNAUTHORIZED!");
  }
});

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

app.use("/api", productRoutes);
app.use("/api", cartRoutes);

app.use(error404);

sequelize
  .sync()
  // .sync({force: true})
  .then(() => {
    // Start the server and listen on the specified port
    app.listen(port, () => {
      // Log a message indicating that the server is running
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("###error", error);
  });
