const fs = require("fs");

let users = [];

fs.readFile("./utils/users.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    users = data.split("\n").map((user) => {
      let userData = user.split(" ");
      return { username: userData[0], chatId: userData[1] };
    });
  }
});

exports.updateUsers = async (newUser, bot) => {
  if (!users.find((user) => user.username === newUser.username)) {
    users.push(newUser);
    let data = "";
    users.forEach((user) => {
      data += `${user.username} ${user.chatId}\n`;
    });

    fs.writeFile("users.txt", data, (err) => {
      if (err) {
        console.error(err);
      }
      console.log("File has been updated");
    });
  }
};
