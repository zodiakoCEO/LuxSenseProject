from fastapi import APIRouter
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

router = APIRouter()

# ============================================
# DATASET QUEMADO — Optimización de iluminación
# ============================================

def get_lighting_data():
    np.random.seed(42)
    n = 500
    hour = np.arange(n) % 24
    natural_light = np.maximum(0, 100 * np.sin((hour - 6) * np.pi / 12))
    occupancy = ((hour >= 8) & (hour <= 20)).astype(int)
    target_brightness = 300
    optimal_artificial = np.maximum(
        0,
        target_brightness - natural_light + np.random.normal(0, 10, n)
    )
    energy_used = optimal_artificial * 0.1 + np.random.normal(0, 2, n)

    return pd.DataFrame({
        'hour': hour,
        'natural_light': natural_light,
        'occupancy': occupancy,
        'optimal_artificial': optimal_artificial,
        'energy_used': energy_used
    })


# ============================================
# MODELO
# ============================================

def train_lighting_model():
    df = get_lighting_data()
    X = df[['hour', 'natural_light', 'occupancy']]
    y = df['optimal_artificial']
    model = LinearRegression()
    model.fit(X, y)
    score = model.score(X, y)
    return model, score

lighting_model, lighting_score = train_lighting_model()


# ============================================
# ENDPOINTS
# ============================================

@router.get("/optimize")
def optimize_lighting(hour: int = 12, natural_light: float = 50.0, occupancy: int = 1):
    input_data = pd.DataFrame([{
        'hour': hour,
        'natural_light': natural_light,
        'occupancy': occupancy
    }])
    optimal = lighting_model.predict(input_data)[0]
    optimal = max(0, float(optimal))
    energy_saved = round((1 - optimal / 300) * 100, 2) if optimal < 300 else 0

    return {
        "success": True,
        "optimization": {
            "hour": hour,
            "natural_light_lux": natural_light,
            "occupancy": bool(occupancy),
            "optimal_artificial_light": round(optimal, 2),
            "energy_saved_percent": energy_saved,
            "recommendation": "Reducir iluminación artificial" if natural_light > 100 else "Mantener iluminación actual"
        },
        "model_accuracy": round(lighting_score * 100, 2)
    }


@router.get("/daily-schedule")
def daily_schedule():
    schedule = []
    for hour in range(24):
        natural = max(0, 100 * np.sin((hour - 6) * np.pi / 12))
        occ = 1 if 8 <= hour <= 20 else 0
        input_data = pd.DataFrame([{
            'hour': hour,
            'natural_light': natural,
            'occupancy': occ
        }])
        optimal = max(0, float(lighting_model.predict(input_data)[0]))
        schedule.append({
            "hour": hour,
            "natural_light_lux": round(natural, 2),
            "optimal_artificial_light": round(optimal, 2),
            "occupancy": bool(occ)
        })

    return {
        "success": True,
        "daily_schedule": schedule,
        "model_accuracy": round(lighting_score * 100, 2)
    }