module.exports = {
  apps: [
    {
      name: 'chukotka-dep',
      script: 'npm start',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '2G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
}
