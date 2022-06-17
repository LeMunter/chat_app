# How to add pem keys for server // JWT

1. Navigate to /server

2. Create private key

- openssl genrsa -out private.pem 2048

3. Generate public key from private key

- openssl rsa -in private.pem -pubout -out public.pem