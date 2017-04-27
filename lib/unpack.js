function unpack(type, json) {
    var obj = new type();
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
                    obj[prop] = unpackArray(obj[prop], json[prop]);
                }
            }
            // Check if something is an object
            else if (obj[prop] === Object(obj[prop])) {
                if (json[prop] !== Object(json[prop])) {
                    // throw error if object is expected but one is not provided.
                }
                else {
                    obj[prop] = unpack(obj[prop], json[prop]);
                }
            }
            // Otherwise assume this is a primitive data type
            else {
                obj[prop] = json[prop];
            }
        }
    });

    return obj;
}

// Helper function for unpacking arrays
// TODO: potentially convert this into a function that instead returns a function
//       that does what is inside the jsonArr.forEach loop.
function unpackArray(objArr, jsonArr) {
    var arr = new Array();

    // First value of the object array is the expected type
    var arrayType = objArr.pop();

    // array
    if (Array.isArray(arrayType)) { 
        jsonArr.forEach(val => {
            arr.push(unpackArray(arrayType, val));
        });
    }
    // if the type is an object, assume it's a class and create a new object of the type
    else if (arrayType === Object(arrayType)) {
        jsonArr.forEach(val => {
            arr.push(unpack(arrayType, val));           
        }); 
    }
    // otherwise assume it's a primitive type
    else {
        jsonArr.forEach(val => {
            arr.push(val);
        });
    }

    return arr;
}

module.exports = unpack;
