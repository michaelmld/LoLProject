// TODO: look for an actual testing framework
// TODO: these tests suck it turns out, need to 
//       improve them to check parsed class type as well.
var unpack = require('../lib/unpack.js');

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
    "string" : "one"
};

class ClassesClass {
    constructor() {
        this.integer = undefined;
        this.decimal = undefined;
        this.string = undefined;
        this.myclass = PrimitivesClass;
    }
}

var classesJson = {
    "integer" : 1,
    "decimal" : 1.5,
    "string" : "one",
    myclass : {
        "integer" : 2,
        "decimal" : 2.5,
        "string" : "two"
    }
};

class ArraysClass {
    constructor() {
        this.integer = undefined;
        this.decimal = undefined;
        this.string = undefined;
        this.myclass = PrimitivesClass;
        this.primitivesArray = [];
        this.classesArray = [PrimitivesClass];
        this.primitivesArraysArray = [[]];
        this.classesArraysArray = [[ClassesClass]];
        this.primitivesArraysArraysArray = [[[]]];
    }
}

var arraysJson = {
    "integer" : 1,
    "decimal" : 1.5,
    "string" : "one",
    myclass : {
        "integer" : 2,
        "decimal" : 2.5,
        "string" : "two"
    },
    primitivesArray : [3, 3.5, "three"],
    classesArray : [
        {"integer" : 4, "decimal" : 4.5, "string" : "four"},
        {"integer" : 5, "decimal" : 5.5, "string" : "five"}
    ],
    primitivesArraysArray : [
        [6, 6.5, "six"],
        [7, 7.5, "seven"]
    ],
    classesArraysArray : [
        [ {"integer" : 8, "decimal" : 8.5, "string" : "eight", myclass : {"integer" : 9, "decimal" : 9.5, "string" : "nine"} },
          {"integer" : 10, "decimal" : 10.5, "string" : "ten", myclass : {"integer" : 11, "decimal" : 11.5, "string" : "11"} } ],
        [ {"integer" : 12, "decimal" : 12.5, "string" : "twelve", myclass : {"integer" : 13, "decimal" : 13.5, "string" : "thirteen"} },
          {"integer" : 14, "decimal" : 14.5, "string" : "fourteen", myclass : {"integer" : 15, "decimal" : 15.5, "string" : "fifteen"} } ]
    ],
    primitivesArraysArraysArray : [
        [ [16, 16.5, "sixteen"],
          [17, 17.5, "seventeen"] ],
        [ [18, 18.5, "eighteen"],
          [19, 19.5, "nineteen"] ]
    ]

};

class ObjectsClass {
    constructor() {
        this.object = {};
        this.classesObject = {"type" : PrimitivesClass};
        this.arraysClassesObject = {"type" : [PrimitivesClass]};
    }   
}

var objectsJson = {
    "object" : {
        "integer" : 20,
        "decimal" : 20.5,
        "string" : "twenty"
    },
    "classesObject" : {
        "class1" : {"integer" : 21, "decimal" : 21.5, "string" : "twenty-one"},
        "class2" : {"integer" : 22, "decimal" : 22.5, "string" : "twenty-two"}
    },
    "arraysClassesObject" : {
        "array1" : [
            {"integer" : 23, "decimal" : 23.5, "string" : "twenty-three"},
            {"integer" : 24, "decimal" : 24.5, "string" : "twenty-four"}
        ],
        "array2" : [
            {"integer" : 25, "decimal" : 25.5, "string" : "twenty-five"},
            {"integer" : 26, "decimal" : 26.5, "string" : "twenty-six"}
        ]
    }
};

var util = require('util');

var results = true;

var primitives = unpack(PrimitivesClass, primitivesJson);
results = results && (JSON.stringify(primitives) === JSON.stringify(primitivesJson));
console.log("PrimitivesClass unpack: " + ((results = results && (JSON.stringify(primitives) === JSON.stringify(primitivesJson))) ? "pass" : "fail"));
console.log(util.inspect(primitives, showHidden=false, depth=null, colorize=true));
console.log();

var classes = unpack(ClassesClass, classesJson);
console.log("ClassesClass unpack: " + ((results = results && (JSON.stringify(classes) === JSON.stringify(classesJson))) ? "pass" : "fail"));
console.log(util.inspect(classes, showHidden=false, depth=null, colorize=true));
console.log();

var arrays = unpack(ArraysClass, arraysJson);
console.log("ArraysClass unpack: " + ((results = results && (JSON.stringify(arrays) === JSON.stringify(arraysJson))) ? "pass" : "fail"));
console.log(util.inspect(arrays, showHidden=false, depth=null, colorize=true));
console.log();

var objects = unpack(ObjectsClass, objectsJson);
console.log("ObjectsClass unpack: " + ((results = results && (JSON.stringify(objects) === JSON.stringify(objectsJson))) ? "pass" : "fail"));
console.log(util.inspect(objects, showHidden=false, depth=null, colorize=true));
console.log();


console.log("Test results: " + (results ? "pass" : "fail"));
