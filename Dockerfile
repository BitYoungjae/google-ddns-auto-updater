FROM node:lts-bullseye-slim

ENV PNPM_HOME="/pnpm" \
    PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY . /app

RUN pnpm i --prod --frozen-lockfile

CMD ["pnpm", "start"]

# 환경변수 지정
ENV HOST_NAME="bityoungjae.com" \
	USER_NAME="fill here" \
    PASSWORD="fill here"