import "babel-polyfill";
import Koa from "koa";
import Router from "koa.router";
import mysql from "mysql2/promise";

const port = process.env.PORT || 9000;

const app = new Koa();
const test = new Router();
const apiPath = "/api";

const connectionSettings = {
    host: "172.16.5.190",
    user: "root",
    database: "db_1",
    password: "db_rootpass",
    namedPlaceholders: true,
};

test.get(`${apiPath}/all`, async (ctx) => {
    try {
        const conn = await mysql.createConnection(connectionSettings);
        const sqlCommand = `SELECT * FROM todos;`;
        const [data] = await conn.execute(sqlCommand);

        ctx.type = "application/json charset=utf-8";
        ctx.body = data;
    }   catch (error) {
        console.error("Error ocurred:", error);
        ctx.throw(500, error);
    }
});

app.use(test.routes());
app.use(test.allowedMethods());
app. listen(port);
console.log(`App listening on port ${port}`);
