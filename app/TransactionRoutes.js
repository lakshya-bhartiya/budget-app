const router = require("express").Router()
const transactionController = require("./TransactionController")
const authanticationToken = require("../helpers/authHelper")


router.post("/", authanticationToken, transactionController.addTransaction)

router.get("/getAllTransactions", authanticationToken, transactionController.getAllTransitions)
router.get("/getTransactions", authanticationToken, transactionController.getUserTransactions)

router.get("/getFilteredTransactions", authanticationToken, transactionController.getFilteredTransactions);


module.exports = router