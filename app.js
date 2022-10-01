const express = require("express");
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {
  const query = req.body.CityName;
  const apikey = "6548322b263d36bb9075b373559d011f";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weathData = JSON.parse(data);
      const temp = weathData.main.temp
      const weathdesc = weathData.weather[0].description
      const icon = weathData.weather[0].icon
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1> The Weather is currently " + weathdesc + "</h1>")
      res.write("<h2> The temperature in "+query+"  is " + temp + " degrees celsius </h2>");
      res.write("<img src=" + imgURL + ">");
      res.send();
    })
  })
})
app.listen(process.env.PORT || 3000 , function() {
  console.log("Server is running on port 3000.");
})
