# Use the official Node.js image as the base
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Copy the rest of the app source code to the container
COPY . .

# Expose the port your app listens on
EXPOSE 3000

# Run the app
CMD ["npm", "start"]