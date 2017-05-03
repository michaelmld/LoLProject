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
            // Check if this property is a non-function object
            else if (typeof obj[prop] === 'object') {
                // check to make sure the json property is a non-null object
                if (json[prop] !== Object(json[prop])) {
                    // throw error if object is expected but one is not provided.
                }
                else {
                    obj[prop] = unpackObject(obj[prop], json[prop]);
                }
            }
            // Check if this property is a function (which is what Classes are)
            else if (typeof obj[prop] === 'function') {
                // json property will never be a function, so just ensure it's at least a non-null object
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

// Helper function for unpacking associative arrays
// TODO: potentially convert this into a function that instead returns a function
//       that does what is inside the Object.keys(jsonObj).forEach loop.
function unpackObject(objObj, jsonObj) {
    var obj = {};

    // if type is not specified, assume primitive type
    var objectType = objObj.type;
    Object.keys(jsonObj).forEach(key => {
        // array
        if (Array.isArray(objectType)) {
            obj[key] = unpackArray(objectType, jsonObj[key]);
        }
        // non-function object
        else if (typeof objectType === 'object') {
            obj[key] = unpackObject(objectType, jsonObj[key]);
        }
        // function, assume class
        else if (typeof objectType === 'function') {
            obj[key] = unpack(objectType, jsonObj[key]);
        }
        // otherwise assume it's a primitive type
        else {
            obj[key] = jsonObj[key];
        }
    });

    return obj;
}

// Helper function for unpacking indexed arrays
// TODO: potentially convert this into a function that instead returns a function
//       that does what is inside the jsonArr.forEach loop.
function unpackArray(objArr, jsonArr) {
    var arr = new Array();

    // First value of the object array is the expected type
    // If nothing exists, undefined is returned and we will assume primitive type
    var arrayType = objArr[0];

    // array
    if (Array.isArray(arrayType)) { 
        jsonArr.forEach(val => {
            arr.push(unpackArray(arrayType, val));
        });
    }
    // non-function object
    else if (typeof arrayType === 'object') {
        jsonArr.forEach(val => {
            arr.push(unpackObject(arrayType, val));           
        }); 
    }
    // function, assume it's a class
    else if (typeof arrayType === 'function') {
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
