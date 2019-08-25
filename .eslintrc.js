module.exports = {
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: "module"
  },
  plugins: ["prettier"],
  extends: ["airbnb", "prettier"],
  rules: {
    "no-param-reassign": [2, { props: false }]
  }
};
