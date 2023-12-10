# Stage 1: Build the Vue.js app with Vite
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and yarn.lock to leverage Docker cache
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

RUN npm run build

# Stage 2: Serve the built app with Nginx
FROM nginx:alpine

# Remove the default Nginx configuration
RUN rm -rf /etc/nginx/conf.d

# Copy the built Vue.js app from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx will run on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
