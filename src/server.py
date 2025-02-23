from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow React frontend to communicate with Flask

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Basic Validation (you can improve this with database checks)
    if not data.get("fullName") or not data.get("email") or not data.get("username"):
        return jsonify({"message": "All fields are required"}), 400
    if len(data.get("password", "")) < 6:
        return jsonify({"message": "Password must be at least 6 characters"}), 400
    if data.get("password") != data.get("confirmPassword"):
        return jsonify({"message": "Passwords do not match"}), 400

    return jsonify({"message": "Registration successful!"}), 200

if __name__ == '__main__':
    app.run(debug=True)
