module.exports = {
  apps: [
    {
      name: 'linky-backend',
      script: './bin/server.js',
      cwd: './backend/build',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3333
      }
    },
    {
      name: 'linky-jobs',
      script: './ace.js',
      args: 'jobs:listen',
      cwd: './backend/build',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'linky-web',
      script: './web/.output/server/index.mjs',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOST: '0.0.0.0'
      }
    }
  ]
}
