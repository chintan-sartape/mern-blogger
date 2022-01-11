const mongoose = require('mongoose');

// DB Connection url
// mongoose.connect('mongodb://localhost:27017/emp_mngt', (err) => {
//     if(!err)
//         console.log('DB connected successfully...')
//     else 
//         console.log('Error in DB connection: '+JSON.stringify(err))
// });

// DB Connection url 
mongoose.connect('mongodb://localhost:27017/react-blogger',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log(`db connected`))
  .catch((err) => console.log(err));

module.exports = mongoose;