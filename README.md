# Bike Rental Service Application

Welcome to our Bike Rental Service Application! This application allows you to manage the rental of bikes to tourists and locals. Below are the instructions on how to set up and run the application locally.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js
- MongoDB

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/asifrkabir/batch-3-assignment-3-asifrkabir.git

```

2. Navigate to the project directory:

```bash
cd batch-3-assignment-3-asifrkabir

```

3. Install dependencies::

```bash
npm install

```

## Configuration

1. Create a .env file in the root directory of the project.

2. Add the following environment variables to the .env file:

```plaintext
PORT=5000
DATABASE_URL={url}
BCRYPT_SALT_ROUNDS={bcrypt_salt_rounds}
DEFAULT_PASSWORD={default_password}
JWT_ACCESS_SECRET={jwt_access_secret}
JWT_ACCESS_EXPIRES_IN={jwt_access_expiry}
JWT_REFRESH_SECRET={jwt_refresh_secret}
JWT_REFRESH_EXPIRES_IN={jwt_refresh_expiry}
```

Adjust the values to match your application.

## Running the Application

To start the application, run the following command:

```bash
npm run start:dev

```

The application will be running at http://localhost:5000.
