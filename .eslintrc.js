module.exports = {
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint"],
    "parserOptions": {
        "project": "./tsconfig.json",
        // extraFileExtensions: ['.vue']
    },
    "extends": [
        "plugin:@typescript-eslint/recommended",
        // "plugin:vue/essential"
    ],
    "rules": {
		"indent": [1, 4],
        "semi": [1, "never"],
        "quotes": [1, "single"],
        "@typescript-eslint/no-inferrable-types": "off",
        // 0 = off, 1 = warn, 2 = error
        "prefer-const": [0, {
            "destructuring": "any",
            "ignoreReadBeforeAssign": false
        }],
        "@typescript-eslint/member-delimiter-style": ["off", {
            multiline: {
                delimiter: 'none',
                requireLast: true,
            },
            singleline: {
                delimiter: 'none',
                requireLast: false,
            },
        }],
        "@typescript-eslint/no-empty-function": [0, {
            "allow": ["function"]
        }],
        "@typescript-eslint/no-explicit-any": [0, {
            "ignoreRestArgs": false,
            "fixToUnknown": false,
        }],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [0, {
            "vars": "all",
            "args": "after-used",
            "ignoreRestSiblings": false
        }],
        "@typescript-eslint/explicit-function-return-type": "off"
    }
}
