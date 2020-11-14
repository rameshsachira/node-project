const mongoose = require('mongoose');

// connect to DB

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useFindAndModify:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() => console.log("Database connected Successfully..!"))
.catch(err => console.log("Error in Connecting to the Database", err));