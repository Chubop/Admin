# build environment
FROM node as build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn run build-staging

# production environment
FROM nginx:alpine
COPY nginx/nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /var/log/app_engine
RUN mkdir -p /usr/share/nginx/www/_ah && \
    echo "healthy" > /usr/share/nginx/www/_ah/health
COPY --from=build /app/build /usr/share/nginx/www
RUN chmod -R a+r /usr/share/nginx/www
ENV PORT 8080
ENV HOST 0.0.0.0
ENV REACT_APP_ENV=staging
EXPOSE 8080
RUN chmod -R a+r /usr/share/nginx/www