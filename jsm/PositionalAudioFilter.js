export default class PositionalAudioFilter {
    constructor(positionalAudio, onListenerTranslate) {
        this.positionalAudio = positionalAudio;
        this.filter = positionalAudio.context.createBiquadFilter();

        const ctx = this.positionalAudio.context;
        this.filter.type = 'lowpass';
        this.filter.frequency.setValueAtTime(22050, ctx.currentTime);
        this.filter.Q.setValueAtTime(4, ctx.currentTime);
        this.filter.gain.setValueAtTime(0.25, ctx.currentTime);

        this.minFreq = 100;
        this.maxFreq = 22050;

        this.onListenerTranslate = onListenerTranslate;
    }

    get type() {
        return this.filter.type.value;
    }

    set type(value) {
        this.filter.type = value;
    }

    get frequency() {
        return this.filter.frequency.value;
    }

    set frequency(value) {
        this.filter.frequency.setValueAtTime(value,
            this.positionalAudio.context.currentTime);
    }

    get Q() {
        return this.filter.Q.value;
    }

    set Q(value) {
        this.filter.Q.setValueAtTime(value,
            this.positionalAudio.context.currentTime);
    }

    get gain() {
        return this.filter.gain.value;
    }

    set gain(value) {
        this.filter.gain.setValueAtTime(value,
            this.positionalAudio.context.currentTime);
    }

    connect() {
        this.positionalAudio.setFilter(this.filter);
    }

    disconnect() {
        this.positionalAudio.removeFilter(this.filter);
    }

    update() {
        const { positionalAudio } = this;
        const camera = positionalAudio.listener.parent;
        const mesh = positionalAudio.parent;

        const distance = camera.position.distanceTo(mesh.position);

        const value = this._calculateValue(distance);

        if (isNaN(value)) return;

        // Rescale value using min/max freq
        const { minFreq, maxFreq } = this;
        const scaledValue = value * (maxFreq - minFreq) + minFreq;

        this.filter.frequency.setValueAtTime(scaledValue, positionalAudio.context.currentTime);
    }

    _calculateValue(distance) {
        const { positionalAudio } = this;
        const distanceModel = positionalAudio.getDistanceModel();
        const refDistance = positionalAudio.getRefDistance();
        const rolloffFactor = positionalAudio.getRolloffFactor();

        switch (distanceModel) {
          case 'linear':
            const maxDistance = positionalAudio.getMaxDistance();
            return 1 - rolloffFactor * (distance - refDistance) / (maxDistance - refDistance);
          case 'inverse':
            return refDistance / (refDistance + rolloffFactor * (Math.max(distance, refDistance) - refDistance));

          case 'exponential':
            return Math.pow(Math.max(distance, refDistance) / refDistance, -rolloffFactor);
        }
    }
}
