
const express = require("express"),
  path = require("path"),
  Discord = require("discord.js");
const app = express(),
  hook = new Discord.WebhookClient(process.env.hookid, process.env.hooktoken);

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
  hook.send(
    new Discord.MessageEmbed()
      .setDescription("Someone just started viewing our home page!")
      .setColor("RED")
  );
});

app.get("/text/reverse=:query", (req, res) => {
  const query = req.params.query;
  const split = query.split("");
  const reversed = split.reverse();
  const response = reversed.join("");
  hook.send(
    new Discord.MessageEmbed()
      .setDescription(`Someone Just Used Reverse Api!\nQuery: \`${query}\``)
      .setColor("RED")
  );
  res.status(200).send({ response });
});

app.use((req, res) => {
  res.status(404).send("this route is invalid");
});
app.listen(3000, () => console.log("Api online!"));
