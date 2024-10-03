# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./
COPY yarn.lock ./

# Check if Yarn is installed, if not, install it
RUN if ! command -v yarn &> /dev/null; then \
      npm install -g yarn; \
    fi

# Install dependencies using Yarn directly
RUN yarn install

# Copy the rest of the application code
COPY . .

# Copy environment variables file
COPY .env .env

# Add seeders to the MongoDB database
RUN yarn seed

# Expose the port the app runs on
EXPOSE 8000

# Start the Node.js application
CMD ["yarn", "start"]  # Adjust this line according to your entry file
