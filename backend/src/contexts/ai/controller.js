const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

export class AIController {

    // ── ENERGÍA ──────────────────────────────
    async getEnergyForecast(req, res, next) {
        try {
            const response = await fetch(`${AI_SERVICE_URL}/ai/energy/forecast`);
            const data = await response.json();
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async predictEnergy(req, res, next) {
        try {
            const { hour, day_of_week, temperature, occupancy } = req.query;
            const url = new URL(`${AI_SERVICE_URL}/ai/energy/predict`);
            if (hour) url.searchParams.set('hour', hour);
            if (day_of_week) url.searchParams.set('day_of_week', day_of_week);
            if (temperature) url.searchParams.set('temperature', temperature);
            if (occupancy) url.searchParams.set('occupancy', occupancy);

            const response = await fetch(url.toString());
            const data = await response.json();
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    // ── ANOMALÍAS ─────────────────────────────
    async getAnomalySummary(req, res, next) {
        try {
            const response = await fetch(`${AI_SERVICE_URL}/ai/anomalies/summary`);
            const data = await response.json();
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async detectAnomaly(req, res, next) {
        try {
            const { sensor_value, hour, day_of_week } = req.query;
            const url = new URL(`${AI_SERVICE_URL}/ai/anomalies/detect`);
            if (sensor_value) url.searchParams.set('sensor_value', sensor_value);
            if (hour) url.searchParams.set('hour', hour);
            if (day_of_week) url.searchParams.set('day_of_week', day_of_week);

            const response = await fetch(url.toString());
            const data = await response.json();
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    // ── ILUMINACIÓN ───────────────────────────
    async getLightingSchedule(req, res, next) {
        try {
            const response = await fetch(`${AI_SERVICE_URL}/ai/lighting/daily-schedule`);
            const data = await response.json();
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async optimizeLighting(req, res, next) {
        try {
            const { hour, natural_light, occupancy } = req.query;
            const url = new URL(`${AI_SERVICE_URL}/ai/lighting/optimize`);
            if (hour) url.searchParams.set('hour', hour);
            if (natural_light) url.searchParams.set('natural_light', natural_light);
            if (occupancy) url.searchParams.set('occupancy', occupancy);

            const response = await fetch(url.toString());
            const data = await response.json();
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
    // ── AMBIENTES ─────────────────────────────
async getAmbientes(req, res, next) {
    try {
        const response = await fetch(`${AI_SERVICE_URL}/ai/energy/ambientes`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        next(error);
    }
}

async getAmbienteDetail(req, res, next) {
    try {
        const { id } = req.params;
        const response = await fetch(`${AI_SERVICE_URL}/ai/energy/ambientes/${id}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        next(error);
    }
}
}