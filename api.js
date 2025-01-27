const express = require("express")
const bodyParser = require("body-parser")
const app  = express()
const fs = require("fs")
require("./db")
const transitionTxt = require("./transitionPage/TransitionApi")
app.use(bodyParser.json())



app.post("/transition", (req, res)=>{
    console.log(req.body)
    const {amount ,type, remark} = req.body
    let details = `amount:${amount},type:${type},remark:${remark}`
    transitionTxt.create({amount, type, remark}).then(databaseRes=>{
        res.send("created successfully")
    }).catch(err=>{
        res.send("error here")
    })
    fs.writeFileSync("transitions.txt", details)
})


app.get("/transitions", (req, res)=>{
    transitionTxt.find({})
    .then((data)=>{
        res.send(data)
    }).catch((data)=>{
        res.send(data)
    })
})


app.patch("/transition/:id", (req, res)=>{
    const {id} = req.params
    const {amount} = req.body
    transitionTxt.findOneAndUpdate({_id:id}, {amount} )
    .then(resDb=>{
      res.send("data updated successfully")
    }).catch(err=>{
      res.send("error in data update")
    })
  
  })


  app.delete("/transition/:id", (req, res)=>{
    const {id} = req.params
    transitionTxt.findOneAndDelete({_id:id})
    .then(dbRes=>{
      res.send("data deleted successfully")
    }).catch(err=>{
      res.send("some error occured while deleting the data")
    })
  })

app.listen(4000,()=>{
    console.log("running server here")
})