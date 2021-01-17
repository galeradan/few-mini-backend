## Description
This is the backend of FEW: Mini Project. Uses NestJS, GraphQL, TypeOrm, and MongoDB. 

For Frontend please visit this [repository](https://github.com/galeradan/few-mini-frontend)

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

Please follow the steps below to run the app on your local

## Clone
Clone the repo then cd to directory
```bash
$ git clone https://github.com/galeradan/few-mini-backend.git
$ cd few-mini-backend
```

## Installation
Install dependencies
```bash
$ yarn
```

## Setup env
- Create a `.env` in the root directory
- go to this [link](https://www.evernote.com/shard/s723/sh/ce68be97-4d75-71fe-f7d3-e60bcade2f28/97d79501524206d7bb55a468981b634c) and add the details to the env of the backend 

## Database
- The app uses MongoDB as Database
  - If you dont have mongodb yet, please install it by following this [documentation](https://docs.mongodb.com/manual/installation/)
  - Use a GUI like [MongoDB Compass](https://www.mongodb.com/products/compass) to do the steps below
  - Alternatively, I created a hosted mongodb database in MongoDB Atlas, just replace the MONGO_URI with the one stated [here](https://www.evernote.com/shard/s723/sh/ce68be97-4d75-71fe-f7d3-e60bcade2f28/97d79501524206d7bb55a468981b634c). No need to follow the steps below for database.
- Create a mongodb database named `few` or the same as the one mention in the .env for backend
- Create a collection named `blogs` and import the this [data](https://gist.github.com/shierro/64b15f127657bdbf6e7de321cd397c21) as JSON


## Running the app
Once the above steps are okay, let's run the app
```bash
# development
$ yarn start:dev
```

## Frontend
- Once backend is running okay, please setup the fronend by following the instructions included in this [repository](https://github.com/galeradan/few-mini-frontend)