module.exports = {
  root: true,
  extends: ["custom"],
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  globals: {
    insights: "readonly",
    shallow: "readonly",
    render: "readonly",
    mount: "readonly",
  },
};
