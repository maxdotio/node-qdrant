import { Qdrant } from "../index.js"

const qdrant = new Qdrant("http://localhost:6333/");

const name = "pretty_colors";

/// -------------------------------------------------------------------------
/// Create the new collection with the name and schema
const schema = {
	"name":name,
    "vector_size": 3,
    "distance": "Cosine"
};
let create_result = await qdrant.create_collection(name,schema);
if (create_result.err) {
    console.error(`ERROR:  Couldn't create collection "${name}"!`);
    console.error(create_result.err);
} else {
    console.log(`Success! Collection "${name} created!"`);
    console.log(create_result.response);
}

/// -------------------------------------------------------------------------
/// Show the collection info as it exists in the Qdrant engine
let collection_result = await qdrant.get_collection(name);
if (collection_result.err) {
    console.error(`ERROR:  Couldn't access collection "${name}"!`);
    console.error(collection_result.err);
} else {
    console.log(`Collection "${name} found!"`);
    console.log(collection_result.response);
}

/// -------------------------------------------------------------------------
/// Upload some points - just five RGB colors
let points = [
    { "id": 1, "payload": {"color": "red"}, "vector": [0.9, 0.1, 0.1] },
    { "id": 2, "payload": {"color": "green"}, "vector": [0.1, 0.9, 0.1] },
    { "id": 3, "payload": {"color": "blue"}, "vector": [0.1, 0.1, 0.9] },
    { "id": 4, "payload": {"color": "purple"}, "vector": [1.0, 0.1, 0.9] },
    { "id": 5, "payload": {"color": "cyan"}, "vector": [0.1, 0.9, 0.8] }
]
let upload_result = await qdrant.upload_points(name,points);
if (upload_result.err) {
    console.error(`ERROR:  Couldn't upload to "${name}"!`);
    console.error(upload_result.err);
} else {
    console.log(`Uploaded to "${name} successfully!"`);
    console.log(upload_result.response);
}

/// -------------------------------------------------------------------------
/// Search the closest color (k=1)
let purplish = [0.8,0.1,0.7];
let search_result = await qdrant.search_collection(name,purplish,1);
if (search_result.err) {
    console.error(`ERROR: Couldn't search ${purplish}`);
    console.error(search_result.err);
} else {
    console.log(`Search results for ${purplish}`);
    console.log(search_result.response);
}


/// -------------------------------------------------------------------------
/// Filtered search the closest color
let filter = {
    "must": [
        { "key": "color", "match": { "keyword": "cyan" } }
    ]
}
let filtered_result = await qdrant.search_collection(name,purplish,1,128,filter);
if (filtered_result.err) {
    console.error(`ERROR: Couldn't search ${purplish} with ${filter}`);
    console.error(filtered_result.err);
} else {
    console.log(`Search results for filtered ${purplish}`);
    console.log(filtered_result.response);
}

/// -------------------------------------------------------------------------
/// Delete the collection
let delete_result = await qdrant.delete_collection(name);
if (delete_result.err) {
    console.error(`ERROR:  Couldn't delete "${name}"!`);
    console.error(delete_result.err);
} else {
    console.log(`Deleted "${name} successfully!"`);
    console.log(delete_result.response);
}
