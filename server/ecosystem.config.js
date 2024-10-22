module.exports = {
  apps: [
    {
      name: "familt_tree_server",
      script: "manage.py",
      args: "runserver 0.0.0.0:8004", 
      watch: true, 
      env: {
        "DJANGO_SETTINGS_MODULE": "backend.settings",
        "PYTHONUNBUFFERED": "1"
      }
    }
  ]
};
