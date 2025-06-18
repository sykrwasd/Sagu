const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Sales = require('./model/Sales');
const app = express();
app.use(cors());
app.use(express.json());
const path = require('path');
const dotenv = require('dotenv')
dotenv.config({path: './.env'});

mongoose.connect(process.env.LINK || "mongodb+srv://sykrwasd:123@relearn.bcxxraw.mongodb.net/saguun?retryWrites=true&w=majority&appName=relearn") //connecting db

    .then(() => console.log('MongoDB connected'))

    .catch(err => console.log('Connection error:', err));


// tells express to serve static files dekat folder public
app.use(express.static(path.join(__dirname, 'public')));

// redirect to index.html aka landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/add', async (req,res) =>{
    const {name,quantity,location,progress,date} = req.body;

    try{
        newSales = new Sales({name,quantity,location,progress,date});
        await newSales.save();
        console.log(newSales);
        res.status(201).json({newSales });
    }
    catch (e) {
        console.error(e);
    }
})

app.get('/getSales', async (req,res) =>{
    try {
   
         const salesData = await Sales.find();
         console.log("sales",salesData)
         
         return res.status(200).json(salesData)
       } catch (e){
         return res.status(500).json({ error: 'Something went wrong' })
       }
   
})

pp.post('/updateProgress', async (req, res) => {
  try {
    const updates = req.body.updates;

    for (const entry of updates) {
      await Sales.findByIdAndUpdate(entry._id, { progress: entry.progress });
    }

    return res.status(200).json({ message: 'Progress updated' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});
a



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
