## About this Project

Reel Rent is backend of a video rental application which helps to manage rentals and returns for a DVD rental store.

## Getting Started

To get started with Reel Rent, follow these steps:

1. Create a MonogoDB cloud account first and a database.
2. Create a file named ".env" at the root of your folder structure and enter the following lines in it.
   - PORT= <-- The port number in which you wish your code to be run, e.g. 3000 -->
   - MONGO_URI= <-- The URI which can be acquired from MongoDb website -->
   - dbName= <-- Your database name -->
   - reel-rent_jwtPrivateKey= <-- Secure key here of your choice. This key is used to encrypt JSON web tokens.-->
3. Run `npm install` to install the required dependencies.
4. Start the server using the command `node index.js` and ensure a proper connection is established with mongodb.
5. Populate the DB with required collections as per the schema available in **models** folder with proper authentication and authorization by calling the respective API endpoints.
6. Voilà, Now the App is ready to manage rentals and returns.
