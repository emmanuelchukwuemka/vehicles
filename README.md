# Vehicles API

A comprehensive vehicle marketplace API built with Node.js, Express, and TypeScript.

## Features
- User authentication and management
- Vehicle listing and management
- Advanced search and filtering
- Favorites system
- Media management
- Order processing
- Review system
- Messaging system

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MySQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/emmanuelchukwuemka/vehicles.git
   cd vehicles
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in the required values:
   ```bash
   cp .env.example .env
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

### Development
For development with auto-reload:
```bash
npm run dev
```

## Deployment to Render

1. Fork this repository to your GitHub account
2. Create a new Web Service on Render
3. Connect your forked repository
4. Set the following environment variables in Render dashboard:
   - `NODE_ENV`: production
   - `JWT_SECRET`: your JWT secret key
   - `REFRESH_SECRET`: your refresh token secret key
   - `DB_USER`: your database username
   - `DB_PASSWORD`: your database password
   - `DB_NAME`: your database name
   - `DB_HOST`: your database host

5. Add the following build command in Render:
   ```
   npm install && npm run build
   ```

6. Add the following start command in Render:
   ```
   npm start
   ```

The service will automatically deploy and start.

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user

### Vehicles
- `POST /api/v1/vehicles` - Create a new vehicle (authenticated)
- `GET /api/v1/vehicles` - Get all vehicles
- `GET /api/v1/vehicles/:id` - Get a specific vehicle
- `PUT /api/v1/vehicles/:id` - Update a vehicle (authenticated)
- `DELETE /api/v1/vehicles/:id` - Delete a vehicle (authenticated)

### Listings
- `POST /api/v1/listings` - Create a new listing (authenticated)
- `GET /api/v1/listings` - Get all listings
- `GET /api/v1/listings/:id` - Get a specific listing
- `PUT /api/v1/listings/:id` - Update a listing (authenticated)
- `DELETE /api/v1/listings/:id` - Delete a listing (authenticated)

### User Profile
- `GET /api/v1/users/me` - Get current user profile (authenticated)
- `PUT /api/v1/users/me` - Update current user profile (authenticated)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
JWT_SECRET=your_jwt_secret_key
REFRESH_SECRET=your_refresh_token_secret_key
NODE_ENV=development
APP_PORT_NUMBER=3000
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_HOST=your_database_host
```

## Project Structure

```
src/
├── config/          # Configuration files
├── globals/         # Global utilities and types
├── loaders/         # Application loaders
├── middlewares/     # Express middlewares
├── migrations/      # Database migrations
├── modules/         # Application modules
│   ├── vehicles/    # Vehicles module (main)
│   ├── auth/        # Authentication module
│   ├── user/        # User module
│   └── ...          # Other modules
├── seeders/         # Database seeders
└── utils/           # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.