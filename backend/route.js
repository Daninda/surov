const Router = require("express");
const router = new Router();
const controller = require("./controller");

router.get("/clients", controller.getClients);
router.put("/client/:id", controller.updateClient);
router.post("/client", controller.createClient);
router.delete("/client/:id", controller.deleteClient);
router.get("/client/:id", controller.getClient);

router.get("/providers", controller.getProviders);
router.put("/provider/:id", controller.updateProvider);
router.post("/provider", controller.createProvider);
router.delete("/provider/:id", controller.deleteProvider);
router.get("/provider/:id", controller.getProvider);

router.get("/models", controller.getModels);
router.put("/model/:id", controller.updateModel);
router.post("/model", controller.createModel);
router.delete("/model/:id", controller.deleteModel);
router.get("/model/:id", controller.getModel);

router.get("/prices", controller.getPrices);
router.put("/price/:id", controller.updatePrice);
router.post("/price", controller.createPrice);
router.delete("/price/:id", controller.deletePrice);
router.get("/price/:id", controller.getPrice);

module.exports = router;
