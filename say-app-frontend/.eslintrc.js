module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "fetch": false,
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "import",
        "@typescript-eslint",
    ],
    "rules": {
        // React Rules
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx"] }],
        "react/no-multi-comp": [1, { "ignoreStateless": true}],
        "react/no-unused-state": [1],
        "react/prefer-stateless-function": [0, { "ignorePureComponents": true }],
        "react/jsx-one-expression-per-line": ["warn", { "allow": "literal" }],

        // JS Rules
        "no-unused-vars": [1],
        "object-curly-spacing": [1],
        "no-underscore-dangle": [0],
        "object-curly-newline": ["warn", {
            "ObjectExpression": { "multiline": true, "minProperties": 2 },
            "ObjectPattern": { "multiline": true },
            "ImportDeclaration": { "multiline": true, "minProperties": 4 },
            "ExportDeclaration": { "multiline": true, "minProperties": 4 }
        }],

        // Typescript rules
        "@typescript-eslint/indent": ["warn", 2],
        "@typescript-eslint/explicit-function-return-type": ["warn", {
            "allowTypedFunctionExpressions": true
        }],
        "@typescript-eslint/camelcase": ["warn"],
    },
    "settings": {
        "import/resolver": {
            "typescript": {},
        },
    },
};