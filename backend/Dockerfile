# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY . .

COPY .env .env
# Install app dependencies for production
RUN npm install --only=production

# Your app binds to port 5000. Change this if your app uses a different port.
EXPOSE 5000

# Command to run the app. Assumes you have a "start" script in your package.json.
CMD [ "npm", "start" ]


