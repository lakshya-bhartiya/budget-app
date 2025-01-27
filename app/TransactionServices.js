const Transaction = require("./TransactionModel")
const transactionServices = {}
transactionServices.addTransaction = async({amount,type,remark,userId})=>{
    console.log(amount,type,remark,userId)
     try{
    let newTransaction = await Transaction.create({amount, type, remark, userId})
    return {status:"OK", data:newTransaction}
}catch(error){
  console.log(error)
    return {status:"ERR", data:null }
  }
}

transactionServices.getAllTransactions = async ()=>{
    try{
        let transactions = await Transaction.find({})
        return {status:"OK", data:transactions}
    }catch{
        return {status:"ERR", data:null ,error:err }
      }
}

transactionServices.getUserTransactions = async (userId, { limit, skip })=>{
    try{
      let transactions = await Transaction.find({userId})
      .limit(limit)
      .skip(skip)
      .sort({amount: 1})
      return {status:"OK", data:transactions}
   
    }catch(err){
      console.log(err)
      return {status:"ERR", data:null, error:err}
    }
   
  }

  transactionServices.getTransactionCount = async (userId) => {
    try {
      const count = await Transaction.countDocuments({ userId });
      return count;
    } catch (err) {
      console.error(err);
      return 0;
    }
  }


  transactionServices.filterTransactions = async (userId, filterOptions) => {
    const { type, amountRange, date, remark } = filterOptions;
    const query = { userId };
  
    if (type) {
      query.type = type;
    }
  
    if (amountRange) {
      const { minAmount, maxAmount } = amountRange;
      query.amount = { $gte: minAmount, $lte: maxAmount };
    }
  

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999); // Set end of the day
      query.createdAt = { $gte: startDate, $lte: endDate };
    }
  
    if (remark) {
      query.remark = { $regex: remark, $options: 'i' }; // Case-insensitive search
    }
  
    try {
      let transactions = await Transaction.find(query);
      return { status: "OK", data: transactions };
    } catch (err) {
      console.log(err);
      return { status: "ERR", data: null, error: err };
    }
  }
module.exports = transactionServices