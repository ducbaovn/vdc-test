# iCommerce sample
This is a coding sample for 2 services in iCommerce microservices. This sample is include 3 repositories:
1. nodejs-common: common library shares functionality for services so that we can focus on business requirement on application service level
2. product-service: for product management
3. activity-service: all user activities will be handled by this service
## Coding styles
- typescripts
- eslint & prettier: linting and auto-format
- husky & lint-staged: git-hook to auto-format before commit
## Test
Unit test & api test using mocha, chai & supertest. Please read detail on [product-service documentation](https://github.com/ducbaovn/vdc-test/blob/master/product-service/README.md)
## Installation
```
docker-compose up -d
```
docker-compose will setup mysql, mongodb, rabbitmq and our 2 services: product-service, activity-service.
It also setup mysql client on http://localhost:8080 
```
server: mysql
username: product
password: 123456
database: product-service
```
and mongodb client on http://localhost:8181
```
username: root
password: example
```
I've already published our common library: @ducbaovn/nodejs-common@1.0.3
## CURL sample
1. Create Product:
```
curl --location --request POST 'http://localhost:3000/api/v1/products' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "samsung note 20",
    "price": 23000000,
    "description": "worse than iphone",
    "brand": "samsung",
    "color": "black"
}'
```
You can capture id in response for later curl
2. List Product:
```
curl --location --request GET 'http://localhost:3000/api/v1/products?key=&brand=&color=&minPrice=&maxPrice=&offset=&limit=&orderBy=&orderType='
```
3. Get Product Detail:
```
curl --location --request GET 'http://localhost:3000/api/v1/products/{id}'
```
4. Update Product:
```
curl --location --request PUT 'http://localhost:3000/api/v1/products/{id}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "iphone 11 pro"
}'
```
5. Delete Product:
```
curl --location --request DELETE 'http://localhost:3000/api/v1/products/{id}'
```
## Documentation
1. [nodejs-common documentation](https://github.com/ducbaovn/vdc-test/blob/master/nodejs-common/README.md)
2. [product-service documentation](https://github.com/ducbaovn/vdc-test/blob/master/product-service/README.md)
3. [activity-service documentation](https://github.com/ducbaovn/vdc-test/blob/master/activity-service/README.md)