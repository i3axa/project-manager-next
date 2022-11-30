export default class IntervalValueChanger {
  constructor(options: {
    value: {
      get: () => number;
      set: (value: number) => void;
      applyChange?: () => void;
    };
    lowerLimit: number;
    upperLimit: number;
    step: number;
    timerInterval?: number;
  }) {
    if (options.step === 0 || options.lowerLimit === options.upperLimit) {
      throw new Error('Invalid constructor options');
    }

    this._value = options.value;
    this._lowerLimit = options.lowerLimit;
    this._upperLimit = options.upperLimit;
    this._step = options.step;
    this._timerInterval = options.timerInterval ?? 100;
  }

  public start() {
    if (this._timer !== null || this._isValueInBounds() === false) {
      return;
    }

    this._timer = setInterval(() => {
      const value = this._value.get();

      if (this._isValueInBounds() === false) {
        const lastValueToSet =
          this._step < 0 ? this._lowerLimit : this._upperLimit;

        if (lastValueToSet !== Infinity) {
          this._value.set(lastValueToSet);
        }

        this.stop();

        return;
      }

      this._value.set(value + this._step);
    }, this._timerInterval);

    this._value.set(this._value.get() + this._step);
  }

  public stop() {
    if (!this._timer) {
      return;
    }

    this._value.applyChange?.();

    clearInterval(this._timer);
    this._timer = null;
  }

  private _isValueInBounds(): boolean {
    const value = this._value.get();

    if (this._step < 0) {
      return (
        Math.ceil(value) > this._lowerLimit &&
        Math.floor(value) <= this._upperLimit
      );
    } else {
      return (
        Math.ceil(value) >= this._lowerLimit &&
        Math.floor(value) < this._upperLimit
      );
    }
  }

  private readonly _lowerLimit: number;
  private readonly _upperLimit: number;
  private readonly _step: number;
  private readonly _timerInterval: number;
  private readonly _value: {
    get: () => number;
    set: (value: number) => void;
    applyChange?: () => void;
  };

  private _timer: number | null = null;
}
