# Stage 1: build React
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: run with nginx
FROM nginx:stable-alpine
# копируем собранный фронт
COPY --from=build /app/build /usr/share/nginx/html
# копируем наш конфиг
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
