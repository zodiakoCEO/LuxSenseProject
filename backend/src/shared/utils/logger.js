export const logger = {
    info: (msg, data = '') => {
        console.log(`[INFO] ${msg}`, data);
    },
    success: (msg, data = '') => {
        console.log(`[SUCCESS] ${msg}`, data);
    },
    warn: (msg, data = '') => {
        console.log(`[WARN] ${msg}`, data);
    },
    error: (msg, data = '') => {
        console.log(`[ERROR] ${msg}`, data);
    },
}