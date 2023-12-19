FROM node:18.17-alpine3.18
WORKDIR /flexmoney_form
COPY package.json package-lock.json .
RUN npm install
EXPOSE 3000
COPY . .
RUN npm run build
CMD ["npm", "start"]