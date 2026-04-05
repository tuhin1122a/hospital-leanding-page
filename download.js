const fs = require('fs');
const https = require('https');

const dir = './public/sounds';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const file = fs.createWriteStream("public/sounds/message.mp3");
// Use a direct reliable download link for a ping sound from githubusercontent
https.get("https://raw.githubusercontent.com/taniarascia/piano/master/public/sounds/c1.mp3", function(response) {
  response.pipe(file);
  file.on("finish", () => {
    file.close();
    console.log("Download Completed");
  });
}).on("error", (err) => {
  console.log("Error: ", err.message);
});
