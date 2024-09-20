const express = require("express");
const path = require("path");

const app = express();

//app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static"), { extensions: ["js"] }));
app.use("/data", express.static(path.resolve(__dirname, "frontend", "data"), { extensions: ["js"] }));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.listen(process.env.PORT || 8888, () => console.log("Server OK... Go localhost:88888"));
