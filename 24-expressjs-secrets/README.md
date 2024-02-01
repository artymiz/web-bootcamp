# Basic Express.js form validation

A simple http server with GET/POST routes.  
The [secret page](public/secret.html) reveals when the user enters the same
password defined in the `.env` file.


## How to Run

Install the node dependencies and add the `.env` file which holds the password.

```sh
npm install
touch .env
echo "PASSWORD=pass" > .env
```


The default password is `pass` in the snippet above, feel free to change
to any value using this format:

```
PASSWORD=<your password here>
```


Now you can run the server with `node` or `nodemon` to see it in action.  
The express app will run in the browser with the url `localhost:3000`.

```sh
node index.js
```

