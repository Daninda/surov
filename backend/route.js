const Router = require("express");
const router = new Router();
const controller = require("./controller");

router.get("/books", controller.getBooks);
router.put("/book/:id", controller.updateBook);
router.post("/book", controller.createBook);
router.delete("/book/:id", controller.deleteBooks);

router.get("/themes", controller.getThemes);
router.put("/theme/:id", controller.updateTheme);
router.post("/theme", controller.createTheme);
router.delete("/theme/:id", controller.deleteTheme);

router.get("/readers", controller.getReaders);
router.put("/reader/:id", controller.updateReader);
router.post("/reader", controller.createReader);
router.delete("/reader/:id", controller.deleteReader);

router.get("/copies", controller.getCopies);
router.put("/copy/:id", controller.updateCopy);
router.post("/copy", controller.createCopy);
router.delete("/copy/:id", controller.deleteCopy);

module.exports = router;
