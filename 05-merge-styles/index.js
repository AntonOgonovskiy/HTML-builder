const fs = require("fs");
const path = require("path");

fs.writeFile(
  path.join(__dirname, "project-dist", "bundle.css"),
  "",
  (error) => {
    if (error) console.error("alredy exist");
  }
);
fs.readdir(
  path.join(__dirname, "styles"),
  { withFileTypes: true },
  (error, data) => {
    (error) => {
      if (error) console.error(error.message);
    };
    data.forEach((i) => {
      let ext = path.extname(i.name);
      if (ext === ".css") {
        fs.readFile(path.join(__dirname, "styles", i.name), (err, data) => {
          if (err) throw err;
          fs.appendFile(
            path.join(__dirname, "project-dist", "bundle.css"),
            data,
            (error) => {
              if (error) console.error(error.message);
            }
          );
        });
      }
    });
  }
);
