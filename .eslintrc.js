module.exports = {
    "extends": "airbnb",
    "rules": {
      "semi": [ "error", "never" ],
      "max-len": [1, 120, 2, {ignoreComments: true}],
      "quote-props": [1, "consistent-as-needed"],
      "no-cond-assign": [2, "except-parens"],
      "no-unused-vars": [1, {"vars": "local", "args": "none"}],
    },
    "env": {
      "browser": true,
      "node": true
    }
  }