const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Express API with Swagger",
      version: "0.1.0",
      description: "This is Express documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Hemang Jagani",
        url: "http://localhost:8000",
        email: "hemangjjagani@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
    tags: [
      {
        name: "Products",
        description: "API for managing products by admin",
      },
      {
        name: "Cart",
        description: "API for managing cart products",
      },
    ],
    components: {
      schemas: {
        products: {
          type: "array",
          items: {
            $ref: "#/components/schemas/product",
          },
        },
        "not-found": {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Product not exist!",
            },
          },
        },
        cartProduct: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The UUID of the product",
            },
            quantity: {
              type: "number",
              description: "The Quantity of the product",
            },
          },
        },
        cart: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The UUID of the product",
            },
            quantity: {
              type: "number",
              description: "The Quantity of the product",
            },
          },
        },
        CartProductRequest: {
          type: "object",
          properties: {
            productId: {
              type: "string",
              description: "The UUID of the product to add to the cart",
            },
          },
          required: ["productId"],
          example: {
            productId: "9729d895-d14f-410c-b2b0-92099d9c4440",
          },
        },
        cartResponse: {
          type: "object",
          properties: {
            cart: {
              type: "object",
              items: {
                $ref: "#/components/schemas/cart",
              },
            },
            message: {
              type: "string",
              description: "Success message",
            },
          },
          example: {
            products: [
              {
                id: "9729d895-d14f-410c-b2b0-92099d9c4440",
                quantity: 8,
              },
            ],
            totalPrice: 4392,
          },
        },
        product: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The UUID of the product",
            },
            title: {
              type: "string",
              description: "The title of the product",
            },
            description: {
              type: "string",
              description: "A brief description of the product",
            },
            price: {
              type: "number",
              description: "The price of the product",
            },
            discountPercentage: {
              type: "number",
              description: "The discount percentage applied to the product",
            },
            rating: {
              type: "number",
              description: "The rating of the product",
            },
            stock: {
              type: "integer",
              description: "The stock quantity of the product",
            },
            brand: {
              type: "string",
              description: "The brand of the product",
            },
            category: {
              type: "string",
              description: "The category of the product",
            },
            thumbnail: {
              type: "string",
              description: "The URL of the product thumbnail image",
            },
            images: {
              type: "array",
              items: {
                type: "string",
              },
              description:
                "An array of URLs of additional images of the product",
            },
          },
          example: {
            id: "9729d895-d14f-410c-b2b0-92099d9c4440",
            title: "iPhone 9",
            description: "An apple mobile which is nothing like apple",
            price: 549,
            discountPercentage: 12.96,
            rating: 4.69,
            stock: 94,
            brand: "Apple",
            category: "smartphones",
            thumbnail:
              "https://media.istockphoto.com/id/497452144/photo/woman-unlock-iphone-6s-rose-gold-on-the-white-background.jpg?s=2048x2048&w=is&k=20&c=5lmXwTBHEu5ojdEVzngGIYYOH9YHLbzsD-BWsLarjMs=",
            images: [
              "https://media.istockphoto.com/id/497451902/photo/isolated-woman-hand-holding-iphone-6s-rose-gold.jpg?s=2048x2048&w=is&k=20&c=GYjhjm2KGp4J1eIahvzKS_rEmEe0eApO3nTLKI293qQ=",
              "https://media.istockphoto.com/id/468819201/photo/touching-screen-on-smart-phone.jpg?s=2048x2048&w=is&k=20&c=KHhbL_xSWMYtIrJx8C5Y1UK_V_DaFYCkSG5Wn52520A=",
            ],
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { specs };
