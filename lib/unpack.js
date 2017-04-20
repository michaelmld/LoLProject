module.exports = function unpack(obj, json) {
    Object.keys(obj).forEach(prop => {
        // ensure the json object has this property
        if (!json.hasOwnProperty(prop)) {
            // throw error if the json does not have an expected property
        }
        else {
            // Need to start with array b/c arrays are also seen as objects
            if (Array.isArray(obj[prop])) {
                if (!Array.isArray(json[prop])) {
                    // throw error if an array is expected but one is not provided.
                }
                else {   
                    unpackArray(obj[prop], json[prop]);
                }
            }
            // Check if something is an object
            else if (obj[prop] === Object(obj[prop])) {
                if (json[prop] !== Object(json[prop])) {
                    // throw error if object is expected but one is not provided.
                }
                else {
                    unpack(obj[prop], json[prop]);
                }
            }
            // Otherwise assume this is a primitive data type
            else {
                obj[prop] = json[prop];
            }
        }
    });
}

// Helper function for unpacking arrays
// TODO: potentially convert this into a function that instead returns a function
//       that does what is inside the jsonArr.forEach loop.
function unpackArray(objArr, jsonArr) {
    // First value of the object array is the expected type
    var arrayType = objArr.pop();

    // array is just a special type of object, convert for use below
    if (Array.isArray(arrayType)) { 
        arrayType = Array;
    }

    // if the type is an object, assume it's a class and create a new object of the type
    if (arrayType === Object(arrayType)) {
        jsonArr.forEach(val => {
            objArr.push(new arrayType());
            unpack(objArr[objArr.length - 1], val);           
        }); 
    }
    // otherwise assume it's a primitive type
    else {
        jsonArr.forEach(val => {
            objArr.push(val);
        });
    }
}
