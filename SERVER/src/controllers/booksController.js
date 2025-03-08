import bookModel from "../models/bookModel.js";
import { Op } from "sequelize";
export default class BooksController {
  async addBook(req, res, imageName) {
    const data = await bookModel.create({ ...req.body, image: imageName });
    console.log(data);
    if (data) {
      res.json({ message: "Book added successfully" });
    } else {
      res.json({ message: "Error in adding book" });
    }
  }
  async getBooksById(req, res) {
    const { id } = req.params;
    if (id) {
      const data = await bookModel.findByPk(id);
      data ? res.json(data) : res.json([]);
    } else {
      res.json({ message: "Book not found" });
    }
  }
  async updateBooksById(req, res) {
    const { id } = req.params;
    if (id) {
      const data = await bookModel.update(req.body, { where: { id } });
      if (data[0]) {
        res.json({ success: true, message: "Book updated successfully" });
      } else {
        res.json({ success: false, message: "Error in updating book" });
      }
    } else {
      res.json({ success: false, message: "Book Id not found" });
    }
  }
  async deleteBookById(req, res) {
    const { id } = req.params;
    if (id) {
      const data = await bookModel.destroy({ where: { id } });
      console.log(data);
      if (data) {
        res.json({ success: true, message: "Book deleted successfully" });
      } else {
        res.json({ success: false, message: "Error in deleting book" });
      }
    } else {
      res.json({ success: false, message: "Book Id not found" });
    }
  }
  async getAllBooks(req, res) {
    let { limit } = req.query;
    if (!limit) limit = 10;

    const data = await bookModel.findAll({
      limit,
    });
    res.json(data);
  }
  async searchBooks(req, res) {
    const { q } = req.query;
    if (q) {
      const data = await bookModel.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${q}%` } },
            { author: { [Op.like]: `%${q}%` } },
            { genre: { [Op.like]: `%${q}%` } },
          ],
        },
      });
      res.json(data);
      console.log(data);
    } else {
      res.json({ message: "No search query found" });
    }
  }
}
