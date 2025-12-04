FROM node:lts-alpine AS base
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
COPY apps ./apps
COPY packages ./packages
RUN pnpm config set store-dir /root/.pnpm-store \
  && if [ -f pnpm-lock.yaml ]; then pnpm install --filter api... --frozen-lockfile --ignore-scripts; else pnpm install --filter api... --ignore-scripts; fi

FROM base AS builder
COPY --from=deps /app ./
ARG DATABASE_URL
ARG NEXT_PUBLIC_APP_URL
ARG API_BASE_URL
ARG NEXT_PUBLIC_API_URL
ENV DATABASE_URL=${DATABASE_URL}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
ENV API_BASE_URL=${API_BASE_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
RUN pnpm --filter api... run build

FROM node:lts-alpine AS runner
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production
ARG DATABASE_URL
ARG NEXT_PUBLIC_APP_URL
ARG API_BASE_URL
ARG NEXT_PUBLIC_API_URL
ENV DATABASE_URL=${DATABASE_URL}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
ENV API_BASE_URL=${API_BASE_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
WORKDIR /app/apps/api
RUN corepack enable
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package.json ./package.json
COPY --from=builder /app/apps/api/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["sh", "-c", "pnpm run prisma:deploy && pnpm run prisma:seed && node dist/main.js"]
