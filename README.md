# Teampro

## Install

### Enviroment files
#### Server
Create a `.env` file in the server directory. It should contain the following:
```
APP_SECRET=<Some Secret>
APP_DB=<mongodb address>
CLIENT_URL=<React URL>
PORT=<Server PORT>
```
Where `<Some Secret>` is any long string of characters, `<mongodb address>` is the mongodb URI, `<React URL>` is the url of the React app including the port, `<Server PORT>` is the port to run the server on (5000 works).

#### Web
Create a `.env.development` file in the web directory. It should contain the following:
```
REACT_APP_API_URL=<Server Address>
```
`<Server Address>` needs to include the IP address and port of the server

#### Mobile
Edit the `enviroment.js` file in the mobile directory to match the address and port of the server. The following portion of the file should be edited:
```
  dev: {
    apiUrl: "<Server Address>/api",
    AuthApiUrl: "<Server Address>/api/auth",
    socketUrl: "<Server Address>/",
    putTokenUrl: "<Server Address>/api/users",
  },
```
`<Server Address>>` needs to include the IP address and port of the server, the routes should be left as is.


### Server
To setup the server run the following from the server directory
```bash
yarn install
```
To start the server run the following from the server directory
```bash
yarn start
```

### Web
To setup React run the following from the web directory
```bash
yarn install
```
To start React run the following from the web directory
```bash
yarn start
```

### Mobile
To setup and start Expo run the following from the mobile directory
```bash
yarn start
```
