# Express.js E-Commerce Demo with Swagger UI

This is a demo application showcasing the use of Express.js along with Swagger UI for building an e-commerce platform.

## Features

- **Express.js Backend**: The backend of this demo is built using Express.js, a popular Node.js web application framework.
- **Swagger UI Integration**: Swagger UI is integrated into the project to provide interactive API documentation.
- **E-commerce Functionality**: The application demonstrates basic e-commerce functionality, such as listing products, adding them to the cart, and processing orders.

## Requirements

- Node.js and npm should be installed on your machine.

## Installation

1. Clone the repository:
    https://github.com/hemangjagani/express-swagger-demo.git

2. Install dependencies:
   npm i

2. Open your web browser and navigate to `http://localhost:3000/api-docs` to access the Swagger UI interface.

3. Explore the API documentation and test the endpoints interactively.

## API Endpoints

- `/api/products`: GET - Retrieve a list of products.
- `/api/products/{id}`: GET - Retrieve details of a specific product.
- `/api/cart`: GET - Retrieve the contents of the shopping cart.
- `/api/cart/add`: POST - Add a product to the shopping cart.
- `/api/cart/remove/{id}`: POST - Remove a product from the shopping cart.
- `/api/orders`: POST - Place an order.

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues for any suggestions or improvements.

## License

This project is licensed under the [MIT License](LICENSE).
