module.exports = {
  apps: [{
    name: "node-demo-app",
    script: "./index.js",
    cwd: "/var/www/html",
    watch: true,
    ignore_watch: ["node_modules"],
    env: {
      NODE_ENV: "production"
    }
  }]
};