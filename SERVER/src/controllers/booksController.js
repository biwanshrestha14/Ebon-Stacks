import bookModel from "../models/bookModel.js";
import constants from "../Constants/textconstant.js";
import urlconst from "../Constants/urlconstants.js";
import { Op } from "sequelize";
export default class BooksController {
  async addBook(req, res, imageName) {
    try {
      const data = await bookModel.create({ ...req.body, image: imageName });
      console.log(data);
      if (data) {
        res.json({ message: constants.BOOK_ADDED_SUCCESS });
      } else {
        res.json({ message: constants.ERROR_ADDING_BOOK });
      }
    } catch (error) {
      return res.json({success:false,message:"Error while quering from the database"})
      
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
        res.json({ success: true, message:constants.BOOK_UPDATED_SUCCESS });
      } else {
        res.json({ success: false, message: constants.ERROR_UPDATING_BOOK });
      }
    } else {
      res.json({ success: false, message: constants.BOOK_ID_NOT_FOUND });
    }
  }
  async deleteBookById(req, res) {
    const { id } = req.params;
    if (id) {
      const data = await bookModel.destroy({ where: { id } });
      console.log(data);
      if (data) {
        res.json({ success: true, message: constants.BOOK_DELETED_SUCCESS });
      } else {
        res.json({ success: false, message: constants.ERROR_DELETING_BOOK });
      }
    } else {
      res.json({ success: false, message: constants.BOOK_ID_NOT_FOUND });
    }
  }
  async getAllBooks(req, res) {
    let d;
    let { limit } = req.query;
    if (!limit) limit = 10;
    try {
      const data = await bookModel.findAll({
        limit:parseInt(limit),
        raw: true,
      });
      console.log(data);
      for(d of data){
        d.image = urlconst.IMG_PATH_URL+d.image;
        // console.log(d.dataValues.image);
      }
    
      res.json(data);
    } catch (error) {
      res.json({success:false,message:error})
      
    }

 
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
