const mongoose = require('mongoose');
const dotenv = require('dotenv');

mongoose.connect(process.env.DATA_BASE_URL, {
    // useNewUrlParser: true,  
    // useUnifiedTopology: true    
}).then(() => {
    console.log("Database is connected successfully");
}).catch((error) => {
    console.error("Database is not connected", error);
});
