module.exports = {
	apps: [
		{
			name: "myapp",
			script: "Api/index.js",
			watch: true,
			exec_interpreter: "babel-node",
			exec_mode: "fork"
		}
	]
};
