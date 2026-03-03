from fastapi import APIRouter
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest

router = APIRouter()

# ============================================
# DATASET QUEMADO — Lecturas de sensores
# ============================================

def get_sensor_data():
    np.random.seed(42)
    n = 500
    normal_readings = np.random.normal(50, 10, n)
    anomaly_indices = np.random.choice(n, 25, replace=False)
    normal_readings[anomaly_indices] = np.random.choice(
        [np.random.uniform(90, 120), np.random.uniform(-10, 5)],
        25
    )
    timestamps = pd.date_range(start='2024-01-01', periods=n, freq='h')
    return pd.DataFrame({
        'timestamp': timestamps,
        'sensor_value': normal_readings,
        'hour': timestamps.hour,
        'day_of_week': timestamps.dayofweek
    })


# ============================================
# MODELO
# ============================================

def train_anomaly_model():
    df = get_sensor_data()
    X = df[['sensor_value', 'hour', 'day_of_week']]
    model = IsolationForest(contamination=0.05, random_state=42)
    model.fit(X)
    return model, df

anomaly_model, sensor_df = train_anomaly_model()


# ============================================
# ENDPOINTS
# ============================================

@router.get("/detect")
def detect_anomaly(sensor_value: float, hour: int = 12, day_of_week: int = 0):
    input_data = pd.DataFrame([{
        'sensor_value': sensor_value,
        'hour': hour,
        'day_of_week': day_of_week
    }])
    prediction = anomaly_model.predict(input_data)[0]
    score = anomaly_model.decision_function(input_data)[0]
    is_anomaly = prediction == -1

    return {
        "success": True,
        "result": {
            "sensor_value": sensor_value,
            "is_anomaly": is_anomaly,
            "anomaly_score": round(float(score), 4),
            "status": "⚠️ Anomalía detectada" if is_anomaly else "✅ Normal"
        }
    }


@router.get("/summary")
def anomaly_summary():
    X = sensor_df[['sensor_value', 'hour', 'day_of_week']]
    predictions = anomaly_model.predict(X)
    total = len(predictions)
    anomalies = int(np.sum(predictions == -1))

    anomaly_records = sensor_df[predictions == -1].tail(5)
    recent = []
    for _, row in anomaly_records.iterrows():
        recent.append({
            "timestamp": str(row['timestamp']),
            "sensor_value": round(float(row['sensor_value']), 2),
            "hour": int(row['hour'])
        })

    return {
        "success": True,
        "summary": {
            "total_readings": total,
            "anomalies_detected": anomalies,
            "anomaly_rate": round((anomalies / total) * 100, 2),
            "recent_anomalies": recent
        }
    }