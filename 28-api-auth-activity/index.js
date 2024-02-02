import express from "express";
import axios from "axios";

const app = express();
app.use(express.urlencoded({ extended: true }));
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
var yourUsername = "";
var yourPassword = "";
var yourAPIKey = "";
var yourBearerToken = "";

app.get("/", (_, res) => {
  const resObj = getResponseObject("API Response");
  res.render("index.ejs", resObj);
});

app.post("/register", (req, res) => {
  yourPassword = req.body.password;
  yourUsername = req.body.username;
  console.log(`username: ${req.body.username}, password: ${req.body.password}`);
  res.render("index.ejs", getResponseObject("Registered Successfully"));
  res.redirect("/");
  // res.send({ username: yourUsername, password: yourPassword })
  // try {
  //   axios.post(`${API_URL}register`, {
  //     username: req.body.username,
  //     password: req.body.password,
  //   }).then((response) => {
  //       yourUsername = req.body.username;
  //       yourPassword = req.body.password;
  //       console.log(`username: ${yourUsername}, password: ${yourPassword}`);
  //       if (response.status === 200) {
  //         res.render("index.ejs", { content: "Registration successful." });
  //       }
  //   });
  // } catch (error) {
  //   console.log(`register error: ${error.message}`);
  //   // res.status(404).send("Error: " + error.message);
  // }
});

app.post("/get-token", (req, res) => {
  yourPassword = req.body.password;
  yourUsername = req.body.username;
  yourBearerToken = "bearerToken";
  console.log(req.body);
  res.redirect("/");
  // res.send({ username: yourUsername, password: yourPassword })
  // try {
  //   axios.post(`${API_URL}get-auth-token`, {
  //     username: req.body.username,
  //     password: req.body.password,
  //   }).then((response) => {
  //     console.log(`token: ${response.data.token}`);
  //     res.render("index.ejs", { token: response.data.token });
  //   });
  // } catch (error) {
  //   res.status(404).send("Error: " + error.message);
  // }
});

app.get("/get-apikey", (_, res) => {
  try {
    axios.get(`${API_URL}generate-api-key`).then((response) => {
      yourAPIKey = response.data.apiKey;
      console.log(`apiKey: ${yourAPIKey}`);
      res.render("index.ejs", getResponseObject("API key received"));
    });
  } catch (error) {
    res.status(404).send("Error: " + error.message);
  }
});

app.get("/noAuth", (_, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try {
    axios.get(`${API_URL}random`).then((response) => {
      if (response.status === 200) {
        res.render( "index.ejs", getResponseObject(JSON.stringify(response.data)) );
      } else {
        console.log(`Error: ${response.status}`);
      }
    });
  } catch (error) {
    res.status(404).send("Error: " + error.message);
  };
});

app.get("/basicauth", (_, res) => {
  //todo 3: write your code here to hit up the /all endpoint
  //specify that you only want the secrets from page 2
  //hint: this is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(url, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  try {
    axios.get(`${API_URL}all?page=2`, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    }).then((response) => {
      res.render( "index.ejs", getResponseObject(json.stringify(response.data)) );
    });
  } catch (error) {
    res.status(404).send("error: " + error.message);
  }
});

app.get("/apiKey", (_, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try {
    axios.get(`${API_URL}filter?apiKey=${yourAPIKey}&score=5`).then((response) => {
      res.render("index.ejs", getResponseObject(JSON.stringify(response.data)) );
    });
  } catch (error) {
    res.status(404).send("Error: " + error.message);
  }
});

app.get("/bearerToken", (_, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  axios.get(`${API_URL}secrets/42`, {
    headers: {
      Authorization: `Bearer ${yourBearerToken}`,
    },
  }).then((response) => {
    res.render("index.ejs", getResponseObject(JSON.stringify(response.data)));
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const getResponseObject = ((resContent) => {
  let resObj = { content: resContent };
  if (yourUsername.length > 0) { resObj.username = yourUsername; }
  if (yourPassword.length > 0) { resObj.password = yourPassword; }
  if (yourAPIKey.length > 0) { resObj.apiKey = yourAPIKey; }
  if (yourBearerToken.length > 0) { resObj.token = yourBearerToken; }

  return resObj;
});
