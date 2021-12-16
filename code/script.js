const e = require("express");
const express = require("express");
const request = require("request");

const app = express();

const port = process.env | 3000;

app.use(express.json());

app.get("/api", async (req, res) => {
  await request(
    {
      url: "https://jsonplaceholder.typicode.com/todos",
      json: true,
    },
    (error, response) => {
      const data = [];
      response.body.forEach((element) => {
        data.push({
          id: element.id,
          title: element.title,
          completed: element.completed,
        });
      });
      res.send(data);
    }
  );
});

app.get("/api/:id", async (req, res) => {
  await request(
    {
      url: `https://jsonplaceholder.typicode.com/users/`,
      json: true,
    },
    async (error, response) => {
      const id = req.params.id;
      await response.body.forEach(async (element) => {
        if (element.id == req.params.id) {
          await request(
            {
              url: "https://jsonplaceholder.typicode.com/todos",
              json: true,
            },
            async (error, response) => {
              const todo = [];
              await response.body.forEach((val) => {
                if (val.userId === element.id) {
                  todo.push(val);
                }
              });
              res.send({ ...element, todo: todo });
            }
          );
        }
      });
    }
  );
});

app.listen(port, () => {
  console.log(`port running on ${port}`);
});
