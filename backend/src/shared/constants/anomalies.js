export const ANOMALIES = {
    NONE: 'ninguna',
    HIGH_CURRENT: 'corriente_alta',
    ABNORMAL_VOLTAGE: 'voltaje_anormal',
    EXCESSIVE_CONSUMPTION: 'consumo_excesivo'
}

export const ANOMALY_SEVERITY = {
    [ANOMALIES.NONE]: 0,
    [ANOMALIESHIGH.CURRENT]: 2,
    [ANOMALIES.ABNORMAL_VOLTAGE]: 2,
    [ANOMALIES.EXCESSIVE_CONSUMPTION]: 3
}