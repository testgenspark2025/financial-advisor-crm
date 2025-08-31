module.exports = {
  apps: [{
    name: 'insights-management',
    script: 'insights-server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 3001
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    log_file: './logs/insights-combined.log',
    out_file: './logs/insights-out.log',
    error_file: './logs/insights-error.log',
    pid_file: './pids/insights-pid.txt',
    time: true
  }]
};