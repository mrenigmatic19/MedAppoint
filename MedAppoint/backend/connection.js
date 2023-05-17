const {MongoClient} = require("mongodb")
const url ='mongodb://127.0.0.1:27017'
const client = new MongoClient(url)
const database = 'MedAppoint'
async function getData(){
     let result = await client.connect()
     let db= result.db(database)
     let collection = db.collection('User_Info')
     let info = await collection.find({}).toArray()
     console.log(info);
}

getData()