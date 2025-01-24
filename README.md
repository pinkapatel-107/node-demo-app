# node-app
node-app
# Navigate to your project directory
cd D:\Pinka-ck\Practice\dummy-app

# Build the Docker images
docker-compose build

# Start the services and project 
docker-compose up

# to stop the service
docker-compose down
 
 # for check the log 
 docker-compose logs

# For Staging:
docker-compose -f docker-compose.staging.yml up

# For Production:
docker-compose -f docker-compose.production.yml up

