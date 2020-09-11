FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Set environment values
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
ARG DB_URI
ENV DB_URI=$DB_URI
ARG SENDGRID_API_KEY
ENV SENDGRID_API_KEY=$SENDGRID_API_KEY
ARG JWT_SECRET
ENV JWT_SECRET=$JWT_SECRET

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5005
CMD [ "npm", "start" ]
