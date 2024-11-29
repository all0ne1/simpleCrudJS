server {
    listen 80;
    server_name express;

    root /usr/share/nginx/html/html;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }

    location /css/ {
        alias /usr/share/nginx/html/css/;
    }

    location /js/ {
        alias /usr/share/nginx/html/js/;
    }

    location /api/ {
                proxy_pass http://express:3000/api/v1/;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;

            }
}
