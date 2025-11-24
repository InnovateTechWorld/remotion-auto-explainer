FROM node:22-bookworm-slim

# Install FFmpeg for audio processing (Chrome not needed - Lambda handles rendering)
RUN apt-get update && apt-get install -y \
  ffmpeg \
  && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Set Node memory limit and FFmpeg threads (optimized for Lambda)
ENV NODE_OPTIONS="--max-old-space-size=512"
ENV FFmpeg_THREADS=1
ENV x264_THREADS=1

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Ensure Chrome is installed for Remotion
RUN npx remotion browser ensure

# Create temp directory for in-memory operations
RUN mkdir -p /tmp

# Expose port
EXPOSE 10000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:10000/health || exit 1

# Start the application
CMD ["npm", "start"]





# FROM node:22-bookworm-slim
# # Install Chrome dependencies
# RUN apt-get update
# RUN apt install -y \
#   libnss3 \
#   libdbus-1-3 \
#   libatk1.0-0 \
#   libgbm-dev \
#   libasound2 \
#   libxrandr2 \
#   libxkbcommon-dev \
#   libxfixes3 \
#   libxcomposite1 \
#   libxdamage1 \
#   libatk-bridge2.0-0 \
#   libpango-1.0-0 \
#   libcairo2 \
#   libcups2
# # Copy everything from your project to the Docker image. Adjust if needed.
# # COPY package.json package*.json tsconfig.json* remotion.config.* token.json client_secret.json youtube-creds.json .env .gitignore ./
# # COPY src ./src
# # # If you have a public folder:
# # COPY public ./public    

# # COPY components ./components

# # COPY out ./out
# COPY . .
# # Install the right package manager and dependencies - see below for Yarn/PNPM
# RUN npm i
# # Install Chrome
# RUN npx remotion browser ensure
# # Run your application
# COPY render.js render.js
# CMD ["node", "render.js"]