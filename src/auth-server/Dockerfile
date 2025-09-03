##############
# Base Image #
##############
FROM node:24-alpine AS builder

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Install dependencies
COPY package.json pnpm*.yaml ./
RUN pnpm install

# Build project
ADD . .
RUN pnpm build

# TODO: Get keys for JWT signing

# Default command
CMD ["node", "build/index.js"]


#####################
# Development Image #
#####################
FROM builder AS development

# TODO: Bind mount for hot reload
ENV VAULT_ADDR="http://vault:8200"
ENV VAULT_NAMESPACE=""


####################
# Production Image #
####################
FROM node:24-alpine AS production

WORKDIR /usr/app
COPY --from=builder /app/build .
CMD ["node", "index.js"]