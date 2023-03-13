const mongoose=require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017/inotebook?readPreference=primary&directConnection=true&tls=false";

const connectToMongo=()=>{
    mongoose.connect(mongoURI)
    console.log("Connected to Mongo!!!")
}

module.exports=connectToMongo;