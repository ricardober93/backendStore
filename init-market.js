import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import {initMarket} from './scripts/init-market'

mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.MONGO_URI, 
    {  
        useNewUrlParser: true,
        useCreateIndex: true, 
        useUnifiedTopology:true
    }
)

const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
    return this.toString();
};

initMarket()
