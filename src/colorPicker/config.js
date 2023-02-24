"use strict";
exports.__esModule = true;
exports.validateHexColor = void 0;
var Cell_1 = require("./Cell");
var InputField_1 = require("./InputField");
var validateHexColor = function (value) {
    return value && value.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/) !== null
        ? "Please give a valid hex color"
        : true;
};
exports.validateHexColor = validateHexColor;
var colorField = {
    name: "color",
    type: "text",
    validate: exports.validateHexColor,
    defaultValue: "#000",
    required: true,
    admin: {
        components: {
            Field: InputField_1["default"],
            Cell: Cell_1["default"]
        }
    }
};
exports["default"] = colorField;
