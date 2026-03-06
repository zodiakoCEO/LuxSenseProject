from fastapi import APIRouter
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from datetime import datetime

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
@router.get("/ambientes")
def get_ambientes_consumption():
    ambientes = [
        {"id": "amb_001", "nombre": "Habitación Principal", "icono": "🛏️", "activo": True},
        {"id": "amb_002", "nombre": "Cocina",               "icono": "🍳", "activo": True},
        {"id": "amb_003", "nombre": "Sala",                 "icono": "🛋️", "activo": False},
        {"id": "amb_004", "nombre": "Baño",                 "icono": "🚿", "activo": False},
        {"id": "amb_005", "nombre": "Oficina",              "icono": "💼", "activo": True},
        {"id": "amb_006", "nombre": "Garaje",               "icono": "🚗", "activo": False},
    ]

    result = []
    for amb in ambientes:
        historial = []
        for h in range(max(0, datetime.now().hour - 5), datetime.now().hour + 1):
            base = 30 + np.random.uniform(-5, 5) if not amb["activo"] else 80 + np.random.uniform(-10, 20)
            historial.append({"hora": f"{h}:00", "kwh": round(float(base), 2)})

        consumo_actual = historial[-1]["kwh"] if historial else 0
        consumo_anterior = historial[-2]["kwh"] if len(historial) > 1 else 0
        tendencia = "subiendo" if consumo_actual > consumo_anterior else "bajando"

        if consumo_actual < 60:
            estado = "optimo"
        elif consumo_actual < 100:
            estado = "moderado"
        else:
            estado = "elevado"

        input_data = pd.DataFrame({
            'hour': [datetime.now().hour],
            'day_of_week': [datetime.now().weekday()],
            'temperature': [22.0],
            'occupancy': [1 if amb["activo"] else 0]
        })
        prediccion = round(float(model.predict(input_data)[0]), 2)

        result.append({
            "id": amb["id"],
            "nombre": amb["nombre"],
            "icono": amb["icono"],
            "activo": amb["activo"],
            "consumo_actual": consumo_actual,
            "prediccion_kwh": prediccion,
            "tendencia": tendencia,
            "estado": estado,
            "historial": historial,
            "eficiencia": round((1 - consumo_actual / 150) * 100, 1)
        })

    return {"success": True, "ambientes": result}


@router.get("/ambientes/{ambiente_id}")
def get_ambiente_detail(ambiente_id: str):
    historial_completo = []
    for h in range(24):
        occ = 1 if 8 <= h <= 22 else 0
        input_data = pd.DataFrame({
            'hour': [h],
            'day_of_week': [datetime.now().weekday()],
            'temperature': [20 + 10 * np.sin(h * np.pi / 12)],
            'occupancy': [occ]
        })
        pred = round(float(model.predict(input_data)[0]), 2)
        historial_completo.append({
            "hora": f"{h}:00",
            "kwh": pred,
            "ocupado": bool(occ)
        })

    return {
        "success": True,
        "ambiente_id": ambiente_id,
        "historial_24h": historial_completo,
        "recomendaciones": [
            "Apagar luces cuando no haya ocupación detectada",
            "Ajustar temperatura entre 18-22°C para mayor eficiencia",
            "Programar apagado automático después de las 22:00"
        ],
        "model_accuracy": round(model_score * 100, 2)
    }