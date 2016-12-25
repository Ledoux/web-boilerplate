import sys
from flask import Flask,flash,g,render_template
import os
import hmac
import json
server_dir = '/'.join(__file__.split('/')[:-1])
sys.path.append(os.path.join(server_dir, 'lib'))
sys.path.append(os.path.join(server_dir, 'modules'))

app = Flask(__name__)

default = {
    'DATA': "localhost",
    'TITLE': "",
    'TYPE': "localhost",
    'URL': "http://localhost:5000"
}
config = {}
for couples in default.items():
	app.config[couples[0]] = os.environ.get(
		couples[0],
		couples[1]
	)
app.config['HOST_DIR'] = "./" if app.config['TYPE'] != 'localhost' else os.path.join(os.getcwd().split('backend')[0], 'backend/')
secret_dir = os.path.join(server_dir, 'config/secret.json')
with open(secret_dir, 'r') as file:
    app.config.update(json.load(file))
flask_env = {
    "TITLE": app.config["TITLE"]
}

INDEX_HTML_NAME = '_index.html' if app.config['TYPE'] == 'localhost' else '_deploy_index.html'

@app.route('/')
def get_rendered_template():
	return render_template(INDEX_HTML_NAME, **flask_env)

# serve index for all paths, so a client side router can take over
@app.route('/<path:path>')
def get_rendered_template_redirect(path):
	return get_rendered_template()

# if the module private is not inside the module folder,
# then the login manager of flask is not called to be set.
# By a certain non explained almost magical reason, this fix the property of
# the flask to render static files.
is_login = os.path.isfile('./app/modules/private.py')
if is_login:
    from flask.ext.login import LoginManager,current_user
    login_manager = LoginManager(app)
    login_manager.login_view = 'private.login_index'
    @app.before_request
    def add_user_before_request():
        g.user = current_user

# then we can also go to specific modules inside this webserver
modules_path = os.path.join(server_dir, 'modules')
if os.path.isdir(modules_path):
    sys.path.append(modules_path)
    module_names = map(
        lambda fcouples:
        fcouples[0],
        filter(
            lambda couples:
            couples[-1]=='py' and couples[0] != "__init__",
            map(
                lambda file_name:
                file_name.split('.'),
                filter(
                    lambda dir_name:
                    dir_name[0] != ".",
                    os.listdir(modules_path)
                )
            )
        )
    )
else:
    module_names = []
# and also it specific libs
lib_path = os.path.join(server_dir, 'lib')
if os.path.isdir(lib_path):
    sys.path.append(lib_path)
    lib_names = map(
        lambda fcouples:
        fcouples[0],
        filter(
            lambda couples:
            couples[-1]=='py' and couples[0] != "__init__",
            map(
                lambda file_name:
                file_name.split('.'),
                filter(
                    lambda dir_name:
                    dir_name[0] != ".",
                    os.listdir(lib_path)
                )
            )
        )
    )
    for lib_name in lib_names:
        __import__(lib_name)
# once the modules and libs are imported we can now
# also plug the blueprints flask to the app
map(
    lambda module:
    app.register_blueprint(getattr(module,'blueprint')),
    filter(
        lambda module:
        hasattr(module,'blueprint'),
        map(
            lambda module_name:
            __import__(module_name),
            module_names
        )
    )
)

if __name__ == '__main__':
    app.run()
