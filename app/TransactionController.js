const transactionService = require("./TransactionServices")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const transactionController = {}

transactionController.addTransaction = async (req, res) => {
    const { amount, type, remark } = req.body
    const validTransactionTypes = ["income", "expense"]


    if (amount <= 0) {
        return res.send({ status: "err", msg: "invalid amount", data: null, })
    }
    if (!validTransactionTypes.includes(type)) {
        return res.send({ status: "err", msg: "invalid type", data: null })
    }
    try {
        const newTransaction = await transactionService.addTransaction({userId:req.userId, amount, type, remark })
        return res.send({ status: "ok", msg: "transaction created successfully", data: newTransaction.data })
    } catch (err) {
        console.log(err)
        return res.send({ status: "err", msg: "something went wrong", data: null })
    }
}

transactionController.getAllTransitions = async (req, res) => {

    const { amount, type, remark } = req.query
    try {
        const getTransaction = await transactionService.getAllTransactions({ amount, type, remark })
        return res.send({ status: "OK", msg: "Transaction Created Successfully", data: getTransaction.data })

    } catch (err) {
        console.log(err)
        return res.send({ status: "ERR", msg: "something went wrong", data: null })

    }


}


transactionController.getUserTransactions = async (req, res) => {

    try {
        let { page, limit } = req.query

        if (limit > 50) limit = 50

        const skip = (page - 1) * limit

        console.log( "user")
        const userTransactions = await transactionService.getUserTransactions(req.userId , {limit: parseInt(limit), skip: parseInt(skip)})
        const totalCount = await transactionService.getTransactionCount(req.userId)
        return res.send({ status: "OK", msg: "Transaction Created Successfulluy", data: userTransactions.data, totalCount: totalCount })

    } catch (err) {
        return res.send({ status: "ERR", msg: "something went wrong", data: null })

    }

}


transactionController.getFilteredTransactions = async (req, res) => {
    const { type, amountRange, dateRange, date,  remark } = req.query;
    const filterOptions = {};
  
    if (type) {
      filterOptions.type = type;
    }
  
    if (amountRange) {
      const [minAmount, maxAmount] = amountRange.split(",");
      filterOptions.amountRange = { minAmount: parseFloat(minAmount), maxAmount: parseFloat(maxAmount) };
    }

    if (date) {
        filterOptions.date = date; // Store the single date
      }
  
    if (remark) {
      filterOptions.remark = remark;
    }
  
    try {
      const filteredTransactions = await transactionService.filterTransactions(
        req.userId,
        filterOptions
      );
      return res.send({
        status: "OK",
        msg: "Transactions filtered successfully",
        data: filteredTransactions.data,
      });
    } catch (err) {
      console.log(err);
      return res.send({ status: "ERR", msg: "something went wrong", data: null });
    }
  }
module.exports = transactionController