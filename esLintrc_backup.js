module.exports = {
    env: {
      browser: true,
      es6: true,
    },
    "settings": {
      "react": {
        "createClass": "createReactClass", // Regex for Component Factory to use,
                                           // default to "createReactClass"
        "pragma": "React",  // Pragma to use, default to "React"
        "version": "^16.0.0", // React version. "detect" automatically picks the version you have installed.
                             // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
                             // default to latest and warns if missing
                             // It will default to "detect" in the future
        "flowVersion": "0.53" // Flow version
      }
    },
    extends: [
      'plugin:react/recommended',
      'airbnb',
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: [
      'react',
    ],
    parser: "babel-eslint",
    rules: {  "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }], },
  };
  