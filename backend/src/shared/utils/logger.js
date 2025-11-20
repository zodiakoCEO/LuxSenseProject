export const logger = {
    info: (msg, data = '') => {
        console.log(`[INFO] ${msg}, data`)
    },
    succes: (msg, data = '') => {
        console.log(`[SUCCES] ${msg}, data`)
    },
    warn: (msg, data = '') => {
        console.log(`[WARN] ${msg}, data`)
    },
    error: (msg, data = '') => {
        console.log(`[ERROR] ${msg}, data`)
    },
}