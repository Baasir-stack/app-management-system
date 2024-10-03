# Step 1: Build the React app
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
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

# Build the React app
RUN yarn build

# Step 2: Serve the app with a web server
FROM nginx:alpine

# Copy the build output to the NGINX html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
