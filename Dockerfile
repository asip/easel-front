ARG time_zone
ARG NODE_VERSION=22.15.0
ARG PNPM_VERSION=10.10.0

FROM node:${NODE_VERSION}-slim AS base

WORKDIR /frontend

RUN npm install -g pnpm@${PNPM_VERSION}

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# FROM base AS builder

COPY . .

RUN pnpm build

# FROM base AS production

# COPY --from=builder /frontend/.output ./.output

ENV TZ=${time_zone}
ENV PORT=3030

EXPOSE 3030

CMD ["pnpm", "start"]