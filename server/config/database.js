const mongoose = require('mongoose')

mongoose.set('strictQuery', true);
const database = () => {
    
        mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser : true,
            useUnifiedTopology : true
        }).then(()=>{
            console.log("mongoDB connected")
        }).catch((err)=>{
            console.log(err)
        })
     
}

module.exports = database