# Deployment Checklist for Render

## Prerequisites
- [ ] Create a Render account at https://render.com
- [ ] Set up your remote MySQL database (e.g., PlanetScale, AWS RDS, or similar)
- [ ] Ensure your database is accessible from external IPs

## Environment Variables Setup
- [ ] In Render dashboard, go to your service settings
- [ ] Add the following environment variables (use your actual values):
  - DB_HOST: your_database_host
  - DB_NAME: your_database_name
  - DB_USER: your_database_username
  - DB_PASSWORD: your_database_password
  - JWT_SECRET: your_jwt_secret_key_here
  - REFRESH_SECRET: your_refresh_token_secret_here
  - NODE_ENV: production
  - UPLOAD_DIR: uploads
  - MAX_FILE_SIZE: 5242880
  - ALLOWED_FILE_TYPES: image/jpeg,image/png,image/webp,video/mp4,video/avi
  - SHOULD_WAIT_FOR_CONNECTION: true
  - CONNECTION_LIMIT: 10
  - DB_MAX_IDLE: 10
  - DB_IDLE_TIMEOUT: 60000
  - DB_QUEUE_LIMIT: 0
  - ENABLE_KEEP_ALIVE: true
  - KEEP_ALIVE_INITIAL_DELAY: 0

## Deployment Steps
- [ ] Push all changes to your Git repository (GitHub, GitLab, etc.)
- [ ] In Render dashboard, create a new Web Service
- [ ] Connect your Git repository
- [ ] Configure the service:
  - Runtime: Docker
  - Dockerfile Path: ./Dockerfile (should auto-detect)
- [ ] Set environment variables as listed above
- [ ] Deploy the service

## Post-Deployment Checks
- [ ] Check the deployment logs for any errors
- [ ] Test the `/server/heartbeat` endpoint to ensure the server is running
- [ ] Test database connectivity
- [ ] Verify that migrations ran successfully during Docker build
- [ ] Test key API endpoints

## Troubleshooting
- If build fails, check the Docker build logs for TypeScript or dependency issues
- If database connection fails, verify environment variables and database accessibility
- If migrations fail, check database permissions and schema compatibility
- Ensure your remote database allows connections from Render's IP ranges
- If Docker build is slow, consider using a .dockerignore file to exclude unnecessary files

## Notes
- The Dockerfile handles build automatically, migrations run on app startup when RUN_MIGRATIONS=true
- The service will use the production database configuration
- Socket.IO is configured with CORS allowing all origins (review for production security)
- Port 10000 is exposed in the container and configured in render.yaml
- Database migrations run during application startup, not during Docker build
