const express = require('express')
const app = express()
const port = process.env.PORT ||  5001
const cors = require('cors');
const objectId = require('mongodb').ObjectID
require('dotenv').config()



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send('Hello World!')
})



const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x4chh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  
  // perform actions on the collection object
 
  const foodCollection = client.db("hotOnion").collection("food");
app.post('/food', (req, res) => {

  const newFood = req.body;
  console.log('Adding new food', newFood)
  foodCollection.insertOne(newFood)
  .then(result => {

  console.log('inserted count', result.insertedCount)
  res.send(result.insertedCount > 0)
  })
})

app.get('/food',(req, res)=>
{
  foodCollection.find()
.toArray((err, items)=>{
 res.send(items)
  console.log('database',items)
})

})



app.get('/food/:id', (req, res)=>{

foodCollection.find({ _id: objectId(req.params.id) })

.toArray((err, documents) => {
  res.send(documents[0])
})

})





});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})