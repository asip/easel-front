FROM node:21-slim

ENV TZ Asia/Tokyo

WORKDIR /frontend

RUN npm install -g pnpm

COPY . /frontend

RUN pnpm install

# RUN npx nuxi upgrade --force

EXPOSE 3030
EXPOSE 24678

# CMD ["pnpm", "dev"]