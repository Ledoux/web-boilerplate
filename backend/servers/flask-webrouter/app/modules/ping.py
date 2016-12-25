from flask import Blueprint
from app import app

blueprint = Blueprint(
    'ping',
    __name__
)

@blueprint.route('/ping')
def get_ping():
    return 'ping'
