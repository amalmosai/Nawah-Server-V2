# Nawah
================

Nawah is a project built using Express.js, TypeScript, and MongoDB.

## About
Nawah is an e-commerce platform that connects date farmers with engineers, enabling them to collaborate and resolve issues related to date production and sales. Additionally, the platform facilitates the sale of dates, fertilizers, and palm products, providing a comprehensive solution for farmers to manage their businesses efficiently.

## Features
* User authentication and authorization using JSON Web Tokens
* File uploads using Multer 
* Payment gateway integration using Stripe
* API documentation using Swagger
* Logging using Winston
* Environment variable management using Dotenv
* Static file serving for uploads

## Getting Started
### Prerequisites
* Node.js (version 14 or higher)
* npm (version 6 or higher)
* TypeScript (version 5.3.3 or higher)

### Installation
1. Clone the repository: `git clone https://github.com/amalmosai/Nawah-server-v2.git`
2. Install dependencies: `npm install`
3. Start the application: `npm run start`

### Configuration
* Create a `.env` file with environment variables (e.g., `MONGO_URL`, `PORT`,`JWT_SECRET`,`STRIPE_SECRET_KEY`,`LOG_FILE_PATH`, etc.)

## API Endpoints
* `/api/v2/auth`: Authentication routes
* `/api/v2/user`: User management routes
* `/api/v2/farmer`: Farmer management routes
* `/api/v2/engineer`: Engineer management routes
* `/api/v2/product`: Product management routes
* `/api/v2/contactMessg`: Contact message management routes
* `/api/v2/order`: Order management routes
* `/api/v2/stripe`: Stripe payment gateway routes
* `/api-docs`: API documentation using Swagger
* `/uploads`: Static file serving for uploads

## Contributing
Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

## Authors
* Amal - amalmosai

## Acknowledgments
* Express.js
* TypeScript
* MongoDB
* Multer
* Stripe
* Swagger
* Winston
* Dotenv