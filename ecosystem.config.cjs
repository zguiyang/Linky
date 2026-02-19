module.exports = {
  apps: [
    {
      name: 'linky-backend',
      script: './bin/server.js',
      cwd: '/app/backend',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3333,
        HOST: '0.0.0.0'
      }
    },
    {
      name: 'linky-jobs',
      script: './ace.js',
      args: 'jobs:listen',
      cwd: '/app/backend',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'linky-web',
      script: './web/.output/server/index.mjs',
      cwd: '/app',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOST: '0.0.0.0'
      }
    }
  ]
}
