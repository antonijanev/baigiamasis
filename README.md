To start the app, you need to open two seperate terminals. One for client and the other for server.

In the first one run:
-cd app/client
-npm ci
-npm run dev

In the second one run:
-cd app/server
-npm ci
-npm run dev

In app/server you need to have an .env file that has your MONGODB_URI.
