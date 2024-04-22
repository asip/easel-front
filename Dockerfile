ARG NODE_VERSION=21.7.3
ARG PNPM_VERSION=9.0.5

FROM node:${NODE_VERSION}-slim as base

WORKDIR /frontend

RUN npm install -g pnpm@${PNPM_VERSION}

# FROM base as builder

COPY --link .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install

COPY --link . .

# RUN npx nuxi upgrade --force

# RUN pnpm build

# FROM base

ENV TZ Asia/Tokyo
ENV PORT 3030

# COPY --from=builder /frontend/.output .
# COPY --from=builder /frontend/node_modules ./node_modules

EXPOSE 3030
# EXPOSE 24678

# CMD ["pnpm", "dev"]
CMD ["node", ".output/server/index.mjs"]