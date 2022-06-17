FROM nginx:alpine
COPY build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ENTRYPOINT ["nginx", "-g", "daemon off;"]