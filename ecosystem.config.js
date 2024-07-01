module.exports = {
    apps: [
        {
            name: "app",
            script: "./app.js",
            watch: true,
            time: true,
            watch_delay: 1000,
            ignore_watch: ["node_modules", "public", ".git"],
            instances: 1,
            env: {
                PORT: 8080,
                NODE_ENV: "development",
            },
            env_production: {
                PORT: 80,
                NODE_ENV: "production",
            },
        },
    ],
};
