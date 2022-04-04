import { Qdrant } from "../index.js"

const qdrant = new Qdrant("http://localhost:6333/");

const name = "pretty_colors";

//Create the new collection with the name and schema
const schema = {
	"name":name,
    "vector_size": 3,
    "distance": "Cosine"
};
let create_result = await qdrant.create_collection(name,schema);
console.log(create_result);

//Show the collection info as it exists in the Qdrant engine
let collection_result = await qdrant.get_collection(name);
console.log(collection_result);

//Upload some points
let points = [
    {
        "id": 1,
        "payload": {"color": "red"},
        "vector": [0.9, 0.1, 0.1]
    },
    {
        "id": 2,
        "payload": {"color": "green"},
        "vector": [0.1, 0.9, 0.1]
    },
    {
        "id": 3,
        "payload": {"color": "blue"},
        "vector": [0.1, 0.1, 0.9]
    },
]
let upload_result = await qdrant.upload_points(name,points);
console.log(upload_result);


//Search the closest color (k=1)
let purple = [0.9,0.1,0.9];
let search_result = await qdrant.search_collection(name,purple,1);
console.log(search_result);


//Delete the collection
let delete_result = await qdrant.delete_collection(name);
console.log(delete_result);
