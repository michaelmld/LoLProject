// TODO: look for an actual testing framework
var unpack = require('./lib/unpack.js');

class PrimitivesClass {
    constructor() {
        this.integer = undefined;
        this.decimal = undefined;
        this.string = undefined;
    }
}

var primitivesJson  = {
    "integer" : 1,
    "decimal" : 1.5,
    "string" : "foo"
};

class ObjectsClass {
    constructor() {
        this.integer = undefined;
        this.decimal = undefined;
        this.string = undefined;
        this.object = PrimitivesClass;
    }
}

var objectsJson = {
    "integer" : 1,
    "decimal" : 1.5,
    "string" : "foo",
    object : {
        "integer" : 2,
        "decimal" : 2.5,
        "string" : "bar"
    }
};

class ArraysClass {
    constructor() {
        this.integer = undefined;
        this.decimal = undefined;
        this.string = undefined;
        this.object = PrimitivesClass;
        this.primitivesArray = [];
        this.objectsArray = [PrimitivesClass];
        this.primitivesArraysArray = [[]];
        this.objectsArraysArray = [[ObjectsClass]];
        this.primitivesArraysArraysArray = [[[]]];
    }
}

var arraysJson = {
    "integer" : 1,
    "decimal" : 1.5,
    "string" : "foo",
    object : {
        "integer" : 2,
        "decimal" : 2.5,
        "string" : "bar"
    },
    primitivesArray : [3, 3.5, "baz"],
    objectsArray : [
        {"integer" : 4, "decimal" : 4.5, "string" : "qux"},
        {"integer" : 5, "decimal" : 5.5, "string" : "quux"}
    ],
    primitivesArraysArray : [
        [6, 6.5, "quuux"],
        [7, 7.5, "quuuux"]
    ],
    objectsArraysArray : [
        [ {"integer" : 8, "decimal" : 8.5, "string" : "quuuuux", object : {"integer" : 9, "decimal" : 9.5, "string" : "quuuuuux"} },
          {"integer" : 10, "decimal" : 10.5, "string" : "quuuuuuux", object : {"integer" : 11, "decimal" : 11.5, "string" : "quuuuuuuux"} } ],
        [ {"integer" : 12, "decimal" : 12.5, "string" : "quuuuuuuuux", object : {"integer" : 13, "decimal" : 13.5, "string" : "quuuuuuuuuux"} },
          {"integer" : 14, "decimal" : 14.5, "string" : "quuuuuuuuuuux", object : {"integer" : 15, "decimal" : 15.5, "string" : "quuuuuuuuuuuux"} } ]
    ],
    primitivesArraysArraysArray : [
        [ [16, 16.5, "quuuuuuuuuuuuux"],
          [17, 17.5, "quuuuuuuuuuuuuux"] ],
        [ [18, 18.5, "quuuuuuuuuuuuuuux"],
          [19, 19.5, "quuuuuuuuuuuuuuuux"] ]
    ]

};

var primitives = unpack(PrimitivesClass, primitivesJson);
console.log("PrimitivesClass unpack");
console.log(primitives);
console.log("Tests:");
console.log("'integer' === 1: " + (primitives.integer === 1));
console.log("'decimal' === 1.5: " + (primitives.decimal === 1.5));
console.log("'string' === 'foo': " + (primitives.string === "foo"));
console.log();

var objects = unpack(ObjectsClass, objectsJson);
console.log("ObjectsClass unpack");
console.log(objects);
console.log("Tests:");
console.log("'integer' === 1: " + (objects.integer === 1));
console.log("'decimal' === 1.5: " + (objects.decimal === 1.5));
console.log("'string' === 'foo': " + (objects.string === "foo"));
console.log("'object.integer' === 2: " + (objects.object.integer === 2));
console.log("'object.decimal' === 2.5: " + (objects.object.decimal === 2.5));
console.log("'object.string' === 'bar': " + (objects.object.string === "bar"));
console.log();

var arrays = unpack(ArraysClass, arraysJson);
console.log("ArraysClass unpack");
console.log(JSON.stringify(arrays, null, 2));
// TODO: finish adding the tests here
console.log();
