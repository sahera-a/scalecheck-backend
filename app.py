# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json
import os
import uuid

from scoring import run_assessment

app = Flask(__name__)
CORS(app)  # allows your React frontend (different port) to call this API

# --- Storage setup: try MongoDB, fall back to a local JSON file if it's not available ---
USE_MONGO = False
try:
    from pymongo import MongoClient
    import os
    MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017/")
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    client.server_info()  # forces a connection check right now
    db = client["scalecheck"]
    submissions_collection = db["submissions"]
    USE_MONGO = True
    print("Connected to MongoDB.")
except Exception as e:
    print("MongoDB not available, using local file fallback:", e)
    LOCAL_DB_FILE = "submissions.json"
    if not os.path.exists(LOCAL_DB_FILE):
        with open(LOCAL_DB_FILE, "w") as f:
            json.dump([], f)


def save_submission(record):
    if USE_MONGO:
        submissions_collection.insert_one(record.copy())  # insert a copy so _id doesn't leak into our record
    else:
        with open(LOCAL_DB_FILE, "r") as f:
            data = json.load(f)
        data.append(record)
        with open(LOCAL_DB_FILE, "w") as f:
            json.dump(data, f, indent=2)


def get_submission(submission_id):
    if USE_MONGO:
        record = submissions_collection.find_one({"id": submission_id}, {"_id": 0})
        return record
    else:
        with open(LOCAL_DB_FILE, "r") as f:
            data = json.load(f)
        for record in data:
            if record["id"] == submission_id:
                return record
        return None


def get_all_submissions():
    if USE_MONGO:
        return list(submissions_collection.find({}, {"_id": 0}))
    else:
        with open(LOCAL_DB_FILE, "r") as f:
            return json.load(f)


# --- Routes ---

@app.route("/assessment", methods=["POST"])
def submit_assessment():
    payload = request.get_json()

    org_name = payload.get("org_name", "Unnamed Org")
    org_name = payload.get("org_name", "Unnamed Org")
    industry = payload.get("industry", "")
    team_size = payload.get("team_size", "")
    answers = payload.get("answers")

    if not answers:
        return jsonify({"error": "Missing 'answers' in request body"}), 400

    result = run_assessment(answers)

    record = {
    "id": str(uuid.uuid4()),
    "org_name": org_name,
    "industry": industry,
    "team_size": team_size,
    "answers": answers,
    "dimension_scores": result["dimension_scores"],
    "overall_score": result["overall_score"],
    "risk_flags": result["risk_flags"],
    "timestamp": datetime.utcnow().isoformat(),
}

    save_submission(record)
    return jsonify(record), 201


@app.route("/assessment/<submission_id>", methods=["GET"])
def retrieve_assessment(submission_id):
    record = get_submission(submission_id)
    if record is None:
        return jsonify({"error": "Not found"}), 404
    return jsonify(record)


@app.route("/benchmarks", methods=["GET"])
def benchmarks():
    all_records = get_all_submissions()
    if not all_records:
        return jsonify({"message": "No submissions yet", "average_scores": {}})

    dims = all_records[0]["dimension_scores"].keys()
    averages = {}
    for dim in dims:
        values = [r["dimension_scores"][dim] for r in all_records]
        averages[dim] = round(sum(values) / len(values))

    return jsonify({
        "total_submissions": len(all_records),
        "average_scores": averages,
    })

FEEDBACK_FILE = "feedback.json"

def _ensure_feedback_file():
    if not os.path.exists(FEEDBACK_FILE):
        with open(FEEDBACK_FILE, "w") as f:
            json.dump([], f)


def save_feedback(record):
    if USE_MONGO:
        db["feedback"].insert_one(record.copy())
    else:
        _ensure_feedback_file()
        with open(FEEDBACK_FILE, "r") as f:
            data = json.load(f)
        data.append(record)
        with open(FEEDBACK_FILE, "w") as f:
            json.dump(data, f, indent=2)


@app.route("/feedback", methods=["POST"])
def submit_feedback():
    payload = request.get_json()
    rating = payload.get("rating")
    if not rating:
        return jsonify({"error": "Missing 'rating'"}), 400

    record = {
        "id": str(uuid.uuid4()),
        "org_name": payload.get("org_name", "Unnamed Org"),
        "rating": rating,
        "comment": payload.get("comment", ""),
        "timestamp": datetime.utcnow().isoformat(),
    }
    save_feedback(record)
    return jsonify(record), 201

if __name__ == "__main__":
    app.run(debug=True, port=5000)