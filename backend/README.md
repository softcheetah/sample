# Backend server

## Deployed on AWS

- AWS Fargate Service is running Docker container (image from ECR).
- It is connected to LoadBalancer.
- LoadBalancer is listening on port 80 and 443.
- LoadBalancer is connected to custom domain.


### `development` environment
- ECS Cluster
```
backend-cluster
```
- Fargate Service
```
backend-ecs-serviceUpdate
```
- ECS Task Definition
```
backend
```
- ECR Repository
```
backend
```
- Target group
```
ecs-backen-backend-ecs-service
```
- Load Balancer
```
backend-LoadBalancer
```
- Custom domain
```
https://api-dev.........................
```

### `production` environment

> Not configured yet


## CI/CD using Github action
### `development` environment
Watch on `master` branch push event
- Build docker image
  - Get secret parameters from `Github secrets`
  - Pass them to docker image
- Push image to `AWS ECR`
- Update `ECS Task Definition` with the latest JSON from the project repository and the latest docker image
- Update `Fargate Service` with the latest `Task Definition`

### `production` environment

> Not configured yet

## How to set up local development environment
- Install Node.js v12
- Install npm packages
```
npm install
```
- Create `.env` file

    `environment` will be determined by `NODE_ENV` value in this file

- Start app
  - nodemon
  ```
    npm run dev
  ```
  - node
  ```
    npm run start-local
  ```
