const eslint = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "react-app",
    "react-app/jest",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking', //TODO
    "plugin:@typescript-eslint/strict",
  ],
};

module.exports = eslint;
