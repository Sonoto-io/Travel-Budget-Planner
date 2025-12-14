# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1.2.22 AS base
WORKDIR /app
RUN apt-get update && apt-get install -y curl

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile


# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --production --frozen-lockfile 


# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# # generate prisma client during build
# RUN bunx prisma generate

# [optional] tests & build
# ENV NODE_ENV=production
# RUN bun test
# RUN bun run build

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=prerelease /app/node_modules node_modules
COPY --from=prerelease /app/index.ts .
COPY --from=prerelease /app/app.ts .
COPY --from=prerelease /app/package.json .
COPY --from=prerelease /app/tsconfig.json .
COPY --from=prerelease /app/src/ ./src/
COPY --from=prerelease /app/prisma/ ./prisma/
COPY --from=prerelease /app/docker/entrypoint.sh .

RUN chown -R bun:bun node_modules
RUN mkdir -p /app/node_modules/.prisma/
# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "sh", "entrypoint.sh" ]