export class EventBus {
    constructor()  {
        this.handlers = {}
    }

    subscribe(eventType, handler) {
        if (!this.handlers[eventType]) {
            this.handlers[eventType] = []
        }
        this.handlers[eventType].push(handler)
    }

    async publish(eventType, payload) {
        if (this.handlers[eventType]) {
            await Promise.all(
                this.handlers[eventType].map(handler => handler(payload))
            )
        }
    }
}