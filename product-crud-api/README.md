# Product CRUD API

A RESTful Product CRUD API built as part of a **TS Academy assignment**, showcasing the progressive development of a backend system from a simple prototype to a more production-ready API.

## Table of contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
  - [Product Management](#product-management)
  - [Authentication & Authorization](#authentication--authorization)
  - [Validation](#validation)
- [Setup & Installation](#setup--installation)
- [API Endpoints](#api-endpoints)
  - [Products](#products)
  - [Auth](#auth)
- [Request Body Examples](#request-body-examples)
  - [Create Product](#create-product)
  - [Update Product](#update-product)
  - [Register User](#register-user)
  - [Login User](#login-user)
- [Role-Based Access](#role-based-access)
- [Notes](#notes)
- [License](#license)

## Overview

This project started as a basic Express server using in-memory storage to handle product CRUD operations. As development progressed, the application was incrementally improved to reflect real-world backend practices.

Key improvements included:

- Migrating from in-memory storage to MongoDB
- Introducing Mongoose ODM for schema definition and data modeling
- Adding request validation using Zod
- Implementing JWT-based authentication
- Storing authentication tokens securely using HTTP cookies
- Adding role-based authorization, with an admin role responsible for sensitive operations

Only users with the admin role are allowed to delete products.

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Zod**
- **JWT**

## Features

### Product Management

- Create products
- Retrieve all products or a single product
- Update product details
- Delete products (admin only)

### Authentication & Authorization

- JWT-based authentication
- Cookie-based token storage
- Role-based access control

### Validation

- Input validation using Zod
- Prevents invalid data from reaching the database

## Setup & Installation

1. **Download the Project**

   The project exists inside a subdirectory of the repository. To avoid cloning the entire repository or running unnecessary Git commands, DownGit is used to download only the required folder.

   Use the link below:

   [Download](https://downgit.github.io/#/home?url=https://github.com/hendrixejegi/ts-academy/tree/authbranch)

   Extract the downloaded folder and open it in your code editor.

2. **Install Dependencies**

   Install dependencies using either pnpm or npm:

   ```bash
   pnpm install
   ```

   or

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Create a `.env` file in the project root.

   Copy all variables from `.env.example` and provide appropriate values.

   Example:

   ```bash
   PORT=3000
   NODE_ENV=development
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

   Ensure your MongoDB instance is running and accessible.

4. **Run the Development Server**

   Start the server in development mode:

   ```bash
   pnpm run dev
   ```

   or

   ```bash
   npm run dev
   ```

   The API will start on the port specified in your `.env` file.

## API Endpoints

### Products

- `GET /api/products` – Get all products
- `GET /api/products/:id` – Get a single product
- `POST /api/products` – Create a product (authenticated)
- `PATCH /api/products/:id` – Update a product (authenticated)
- `DELETE /api/products/:id` – Delete a product (admin only)

### Auth

- `POST /api/auth/sign-up/email` – Register user
- `POST /api/auth/sign-in/email` – Login user
- `POST /api/auth/sign-out` – Logout user

## Request Body Examples

Only endpoints that require a request body are documented below.

## Create Product

**POST `/api/products`**

```json
{
  "name": "Wireless Mouse",
  "onSale": true
}
```

**Validation Rules**

- name (required) — string
- onSale (optional) — boolean
  - Defaults to `false` if not provided

## Update Product

**PATCH `/api/products/:id`**

```json
{
  "onSale": false
}
```

or

```json
{
  "name": "Updated Product Name"
}
```

**Validation Rules**

- name (optional) — string
- onSale (optional) — boolean
- At least one field must be provided
- Requests with an empty body will fail validation

## Register User

**POST `/api/auth/sign-up/email`**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "strongPassword123",
  "admin": true
}
```

**Validation Rules**

- name (required) — string
- email (required) — valid email
- password (required) — string
- admin (optional) — boolean
  - Defaults to false

## Login User

**POST `/api/auth/sign-in/email`**

```json
{
  "email": "john@example.com",
  "password": "strongPassword123"
}
```

**Validation Rules**

- email (required) — valid email
- password (required) — string

## Role-Based Access

| Action         | User | Admin |
| -------------- | ---- | ----- |
| Create product | ✅   | ✅    |
| Update product | ✅   | ✅    |
| Delete product | ❌   | ✅    |

## Notes

- This project was built incrementally to demonstrate backend fundamentals and clean API design.

- Emphasis was placed on validation, authentication, and proper authorization boundaries.

## License

This project was created for educational purposes as part of a TS Academy assignment.
