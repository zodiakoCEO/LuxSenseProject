from fastapi import APIRouter
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

router = APIRouter()

def get_energy_data():
    np.random.seed(42)
    n = 500
    hours = np.arange(n) % 24
    day_of_week = (np.arange(n) // 24) % 7
    temperature = 20 + 10 * np.sin(hours * np.pi / 12) + np.random.normal(0, 2, n)
    occupancy = ((hours >= 8) & (hours <= 20)).astype(int)
    consumption = (
        50 +
        30 * occupancy +
        2 * temperature +
        10 * (day_of_week < 5).astype(int) +
        np.random.normal(0, 5, n)
    )
    return pd.DataFrame({
        'hour': hours,
        'day_of_week': day_of_week,
        'temperature': temperature,
        'occupancy': occupancy,
        'consumption': consumption
    })

def train_model():
    df = get_energy_data()
    X = df[['hour', 'day_of_week', 'temperature', 'occupancy']]
    y = df['consumption']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = LinearRegression()
    model.fit(X_train, y_train)
    score = model.score(X_test, y_test)
    return model, score

model, model_score = train_model()

@router.get("/predict")
def predict_energy(hour: int = 12, day_of_week: int = 0, temperature: float = 22.0, occupancy: int = 1):
    input_data = pd.DataFrame({
        'hour': [hour],
        'day_of_week': [day_of_week],
        'temperature': [temperature],
        'occupancy': [occupancy]
    })
    prediction = model.predict(input_data)[0]
    return {
        "success": True,
        "prediction": {
            "consumption_kwh": round(float(prediction), 2),
            "hour": hour,
            "day_of_week": day_of_week,
            "temperature": temperature,
            "occupancy": bool(occupancy)
        },
        "model_accuracy": round(model_score * 100, 2)
    }

@router.get("/forecast")
def forecast_energy():
    predictions = []
    for hour in range(24):
        input_data = pd.DataFrame({
            'hour': [hour],
            'day_of_week': [0],
            'temperature': [20 + 10 * np.sin(hour * np.pi / 12)],
            'occupancy': [1 if 8 <= hour <= 20 else 0]
        })
        pred = model.predict(input_data)[0]
        predictions.append({
            "hour": hour,
            "consumption_kwh": round(float(pred), 2)
        })
    return {
        "success": True,
        "forecast": predictions,
        "model_accuracy": round(model_score * 100, 2)
    }