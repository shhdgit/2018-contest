class Event {
  constructor() {
    this._list = {}
  }

  addEvent(eventName, func) {
    if (!this._list[eventName]) this._list[eventName] = []

    this._list[eventName].push(func)

    return () => this.removeEvent(eventName, func)
  }

  removeEvent(eventName, func) {
    if (!this._list[eventName]) return

    this._list[eventName].filter(_func => _func !== func)
  }

  emit(eventName) {
    if (!this._list[eventName]) return

    this._list[eventName].forEach(func => func())
  }
}

export {
  Event,
}
