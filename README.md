# threejs-3d-sound-sandbox

Just trying filters on a ThreeJS PositionalAudio object (WebAudio Panner
wrapper), to get a richer 3D sound simulation.

This example was based on the [ThreeJS WebAudio sandbox
example](https://threejs.org/examples/?q=audio#webaudio_sandbox).  THe main difference is that there is only one Mesh and one PositionalAudio.

See [jsm/PositionalAudioFilter.js](jsm/PositionalAudioFilter.js) for the actual
class that implements the filters.  

For now, there is a Low shelf filter implemented with the
[BiquadFilterNode](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode),
that changes its frequency dynamically based on the camera and mesh distance.
By default, the distance model used is the same as the one set to the
Panner/PositionalAudio object (either "linear", "inverse" or "exponential").

## Usage

Clone repository and install dependnecies by running `yarn`.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see
the result.

You can start editing the page by modifying `pages/index.js`. The page
auto-updates as you edit the file.
