FROM node:20 AS build

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@9.9.0

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the frontend
RUN pnpm run build

# # Stage 2: Serve the frontend
# FROM nginx:alpine

# # Copy the built frontend files to the Nginx container
# COPY --from=build /app/dist /usr/share/nginx/html

# # Expose port 80 for the frontend
# EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]