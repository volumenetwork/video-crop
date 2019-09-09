# video-crop

[![Build Status](https://travis-ci.org/volumenetwork/video-crop.svg?branch=master)](https://travis-ci.org/volumenetwork/video-crop)

## Usage

```$xslt
import VideoCrop from 'video-crop'; // or const VideoCrop = require('video-crop').default;

const testFile = '/path/to/myfile.mp4';
const outFile = '/path/to/out.mp4';

const opts = {
  input: testFile,
  output: outFile,
  x: [500, 600],
  y: [250, 500],
  height: [100, 300],
  width: [100, 300],
  fps: 60 // optional 
};

const vc = new VideoCrop();
vc.run(); // outputs two files: '/path/to/out1.mp4', '/path/to/out2.mp4'
```

## Contribute

### Build

`yarn run build`

### Tests

`yarn test`
