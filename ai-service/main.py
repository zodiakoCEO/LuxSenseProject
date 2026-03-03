from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import energy, anomalies, lighting

app = FastAPI(
    title="LuxSense AI Service",
    description="Microservicio de inteligencia artificial para LuxSense",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5002"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(energy.router, prefix="/ai/energy", tags=["Energía"])
app.include_router(anomalies.router, prefix="/ai/anomalies", tags=["Anomalías"])
app.include_router(lighting.router, prefix="/ai/lighting", tags=["Iluminación"])

@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "LuxSense AI",
        "models": ["energy", "anomalies", "lighting"]
    }