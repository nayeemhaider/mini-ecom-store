# 1) Install dependencies (prod only) ───────────────────────────────────────
FROM node:18-alpine AS deps
WORKDIR /app

# Copy just package manifests for fast rebuilds
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# 2) Build the app ────────────────────────────────────────────────────────
FROM node:18-alpine AS build
WORKDIR /app

# Copy full source and all deps (dev + prod)
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Build your Next.js (or other) app
RUN npm run build

# 3) Assemble runtime image ───────────────────────────────────────────────
FROM node:18-alpine AS runner
WORKDIR /app

# Set NODE_ENV for production optimizations
ENV NODE_ENV=production
# (Optional) disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Copy only what’s needed to run
COPY --from=deps    /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next

# only copy public if it exists
RUN [ -d /app/public ] && mkdir -p public && cp -a /app/public/* public/ || echo "no public folder, skipping"
COPY --from=build   /app/package.json ./

# Expose the port your app listens on
EXPOSE 3000

# Launch via npm
CMD ["npm", "run", "start"]
