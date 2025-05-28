FROM node:18-alpine
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy source & build
COPY . .
RUN npm run build

# Expose the port your app listens on
EXPOSE 8000

# Launch via your "start" script
CMD ["npm", "run", "start"]
