import connection from './models/index.js'
import express from "express";
import "dotenv/config";
import bookRoutes from "./routes/books.routes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use('/books', bookRoutes);
app.listen(process.env.PORT || 8000, async() => {
  try {
    await connection.authenticate()
    connection.sync();
    console.log('Connection has been established successfully to the database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  await connection.authenticate()
  console.log(`Server is running at port ${process.env.PORT}`);
});