module.exports = {
    env: {
        "browser": true,
        "es2020": true
    },
    extends: [
        "plugin:react/recommended",
        "plugin:prettier/recommended",
        "airbnb",
        "prettier",
        "prettier/react"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
            "jsx": true
        },
        ecmaVersion: 11,
        sourceType: "module",
    },
    plugins: [
        "react",
        "@typescript-eslint"
    ],
    rules: {
        "prettier/prettier": ["error", {
            "endOfLine":"auto"
        }],  
        "react/jsx-filename-extension": [
            "warn",
            { extensions: [".tsx", ".ts"] }
        ],
        "import/prefer-default-export": "off",
        "import/no-unresolved": "off",
        "import/extensions": "off", 
        "react/state-in-constructor": "off",
        "no-unused-vars": "off",
        "react/static-property-placement": "off",
    }
};
