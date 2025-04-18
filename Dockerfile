ARG NODE_VERSION=22.14.0
ARG PNPM_VERSION=10.8.1

FROM node:${NODE_VERSION}-slim AS base

WORKDIR /frontend

RUN npm install -g pnpm@${PNPM_VERSION}

# FROM base AS builder

COPY --link .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install

COPY --link . .

# RUN npx nuxi upgrade --force

# RUN pnpm build

# FROM base

ENV TZ=Asia/Tokyo
ENV PORT=3030

# COPY --from=builder /frontend/.output .
# COPY --from=builder /frontend/node_modules ./node_modules

EXPOSE 3030
# EXPOSE 24678

# CMD ["pnpm", "dev"]
CMD ["node", ".output/server/index.mjs"]