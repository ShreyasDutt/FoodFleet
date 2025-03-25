import mongoose from 'mongoose'

const mongoURI = "mongodb+srv://Foodapp:shreyas@cluster0.mxp0kl0.mongodb.net/FoodApp?retryWrites=true&w=majority&appName=Cluster0";

const connect = () =>{
    mongoose.connect(mongoURI).then(async () => {
        console.log("MongoDB Connected!")

        // fetching data
        const db = mongoose.connection.db;
        const collection = db.collection("item_list");
        const collection2 = db.collection("itemCategory");
        const items = await collection.find({}).toArray();
        const foodCategory = await collection2.find({}).toArray();
        // console.log(items);

        // eslint-disable-next-line no-undef
        global.food_items = items;
        // eslint-disable-next-line no-undef
        global.foodCategory = foodCategory;
        // console.log(foodCategory)

    }).catch((e)=>{
        console.log("ConnectionFailed"+e)
    })
}

export default connect;