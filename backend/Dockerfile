# Use an official Node.js image
FROM node:14

# Set working directory
WORKDIR /app

COPY package.json package-lock.json ./

# Install dependencies
RUN npm install
# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

