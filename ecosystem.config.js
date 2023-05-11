module.exports = {
	apps: [
		{
			name: "myapp",
			script: "Api/index.js",
			interpreter: "@babel/node",
			interpreter_args: "--extensions .js",
			watch: true,
			ignore_watch: ["node_modules"]
		}
	]
};
