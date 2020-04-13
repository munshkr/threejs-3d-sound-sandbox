# threejs-3d-sound-sandbox

[See Demo](https://munshkr.github.io/threejs-3d-sound-sandbox/)

Testing filters on a ThreeJS PositionalAudio object (WebAudio Panner wrapper),
to get a richer 3D sound simulation.

For now, there is a Low shelf filter implemented with the
[BiquadFilterNode](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode),
that changes its frequency dynamically based on the camera and mesh distance.
By default, the distance model used is the same as the one set to the
Panner/PositionalAudio object (either "linear", "inverse" or "exponential").

## Usage

See [jsm/PositionalAudioFilter.js](jsm/PositionalAudioFilter.js) for the actual
class that implements the filters.

To use:

```javascript
const camera = new THREE.PerspectiveCamera(...);
const listener = new THREE.AudioListener();
camera.add(listener);

...

const sound = new THREE.PositionalAudio(listener);
const filter = new PositionalAudioFilter(sound);

filter.connect();
```

Then, when the camera moves, you should call `filter.update()`, to update
frequency based on distance.


## Attributions

This example was based on the [ThreeJS WebAudio sandbox
example](https://threejs.org/examples/?q=audio#webaudio_sandbox).

## License

See [LICENSE](LICENSE).
