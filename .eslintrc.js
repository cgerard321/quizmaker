module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
    extends: ["react-app", "eslint:recommended", "plugin:prettier/recommended"],
};
