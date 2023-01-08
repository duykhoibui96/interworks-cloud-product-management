# interworks-cloud-product-management

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Steps

Run `yarn` to install all dependencies
Run `yarn start` to start the web app

## Dependencies

The web app will call to [interworks.cloud API](https://bss.leadercloud.com.au/apidocs/?urls.primaryName=API%20Version%203%20for%20Resellers) for retrieving data via a [proxy server](https://github.com/duykhoibui96/cors-proxy). The reason to use the proxy server for bypassing CORS issue. Be sure to run the proxy server so that the web app can make API calls.
