"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
// this is how we'll interface with Payload itself
var forms_1 = require("payload/components/forms");
// retrieve and store the last used colors of your users
var preferences_1 = require("payload/components/preferences");
// re-use Payload's built-in button component
var components_1 = require("payload/components");
// we'll re-use the built in Label component directly from Payload
var forms_2 = require("payload/components/forms");
// we'll import and reuse our existing validator function on the frontend, too
var config_1 = require("./config");
// Import the SCSS stylesheet
require("./styles.scss");
// keep a list of default colors to choose from
var defaultColors = [
    '#333333',
    '#9A9A9A',
    '#F3F3F3',
    '#FF6F76',
    '#FDFFA4',
    '#B2FFD6',
    '#F3DDF3',
];
var baseClass = 'custom-color-picker';
var preferenceKey = 'color-picker-colors';
var InputField = function (props) {
    var path = props.path, label = props.label, required = props.required;
    var _a = (0, forms_1.useFieldType)({
        path: path,
        validate: config_1.validateHexColor
    }), _b = _a.value, value = _b === void 0 ? '' : _b, setValue = _a.setValue;
    var _c = (0, preferences_1.usePreferences)(), getPreference = _c.getPreference, setPreference = _c.setPreference;
    var _d = (0, react_1.useState)(defaultColors), colorOptions = _d[0], setColorOptions = _d[1];
    var _e = (0, react_1.useState)(false), isAdding = _e[0], setIsAdding = _e[1];
    var _f = (0, react_1.useState)(''), colorToAdd = _f[0], setColorToAdd = _f[1];
    (0, react_1.useEffect)(function () {
        var mergeColorsFromPreferences = function () { return __awaiter(void 0, void 0, void 0, function () {
            var colorPreferences;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getPreference(preferenceKey)];
                    case 1:
                        colorPreferences = _a.sent();
                        if (colorPreferences) {
                            setColorOptions(colorPreferences);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        mergeColorsFromPreferences();
    }, [getPreference, setColorOptions]);
    var handleAddColor = (0, react_1.useCallback)(function () {
        setIsAdding(false);
        setValue(colorToAdd);
        // prevent adding duplicates
        if (colorOptions.indexOf(colorToAdd) > -1)
            return;
        var newOptions = colorOptions;
        newOptions.unshift(colorToAdd);
        // update state with new colors
        setColorOptions(newOptions);
        // store the user color preferences for future use
        setPreference(preferenceKey, newOptions);
    }, [colorOptions, setPreference, colorToAdd, setIsAdding, setValue]);
    return (<div className={baseClass}>
      <forms_2.Label htmlFor={path} label={label} required={required}/>
      {isAdding && (<div>
          <input className={"".concat(baseClass, "__input")} type="text" placeholder="#000000" onChange={function (e) { return setColorToAdd(e.target.value); }} value={colorToAdd}/>
          <components_1.Button className={"".concat(baseClass, "__btn")} buttonStyle="primary" iconPosition="left" size="small" onClick={handleAddColor} disabled={(0, config_1.validateHexColor)(colorToAdd) !== true}>
            Add
          </components_1.Button>
          <components_1.Button className={"".concat(baseClass, "__btn")} buttonStyle="secondary" iconPosition="left" iconStyle="with-border" size="small" onClick={function () { return setIsAdding(false); }}>
            Cancel
          </components_1.Button>
        </div>)}
      {!isAdding && (<react_1.Fragment>
          <ul className={"".concat(baseClass, "__colors")}>
            {colorOptions.map(function (color, i) { return (<li key={i}>
                  <button type="button" key={color} className={"chip ".concat(color === value ? 'chip--selected' : '', " chip--clickable")} style={{ backgroundColor: color }} aria-label={color} onClick={function () { return setValue(color); }}/>
                </li>); })}
          </ul>
          <components_1.Button className="add-color" icon="plus" buttonStyle="icon-label" iconPosition="left" iconStyle="with-border" onClick={function () {
                setIsAdding(true);
                setValue('');
            }}/>
        </react_1.Fragment>)}
    </div>);
};
exports["default"] = InputField;
