module.exports = {
  "output": {
    "filename": "[name].pack.js"
  },
  "resolve": {
    "extensions": [
      "ts",
      ".js",
      ".json"
    ],
    "alias": {}
  },
  "module": {
    "rules": [
      {
        "use": {
          "loader": "ts-loader"
        },
        "exclude": /node_modules/,
        "test": /\.ts$/
      }
    ]
  },
  "entry": {
    "index": "./index"
  }
}