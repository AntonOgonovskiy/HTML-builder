const fs = require("fs");
const path = require("path");
const { stdin, stdout } = process;
fs.writeFile(path.join(__dirname, "text.txt"), "", (error) => {
  if (error) {
    console.error(error.message);
  }
});
stdout.write("Hello\nEnter anything\n");

stdin.on("data", (data) => {
  fs.appendFile(path.join(__dirname, "text.txt"), data, (error) => {
    if (error) {
      console.error(error.message);
    }
  });
  if (data.toString().trim() === "exit") {
    process.exit();
  }
});
process.on("exit", () => console.log("good luck"));
process.on("SIGINT", () => {
  process.exit();
});
