from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/api/status')
def status():
    return jsonify({
        'hint': 'This country was the last in Europe to adopt Christianity.',
        'timeLeft': 1800
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)