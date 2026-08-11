# Site estatico: nao ha build. So copiar publicar/ para o nginx.
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY publicar/ /usr/share/nginx/html/

EXPOSE 80
