import { Router } from "express";
import multer from "multer";
import BooksController from "../controllers/booksController.js";
const router = Router();

let imageName;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    imageName= Date.now() + '-' + Math.round(Math.random() * 1E9)+"-"+file.originalname.trim();
    cb(null, imageName)
  }
})

const upload = multer({ storage: storage })
const bookcontroller = new BooksController();

router.get("/",bookcontroller.getAllBooks);
router.post("/add", upload.single("image"), (req, res) => {
  bookcontroller.addBook(req, res,imageName);

});
router.get("/:id",bookcontroller.getBooksById);
router.put("/update/:id",bookcontroller.updateBooksById);
router.delete("/delete/:id",bookcontroller.deleteBookById);
router.get("/search/all",bookcontroller.searchBooks);


export default router;
