import FfmpegCommand from 'fluent-ffmpeg';
import os from 'os';

const defaultOptions = {
  input: '',
  output: `${os.homedir()}/out.mp4`,
  x: [0],
  y: [0],
  height: [0],
  width: [0],
};

function buildCropString(width, height, x, y) {
  return `${width}:${height}:${x}:${y}`;
}

function buildCropObject(width, height, x, y) {
  return {
    filter: 'crop',
    options: buildCropString(width, height, x, y),
  };
}


export default class VideoCrop {
  constructor(options) {
    const o = options || {};
    this.opts = { ...defaultOptions, ...o };
  }

  getOptions() {
    return this.opts;
  }

  buildFilterArray() {
    const result = [];

    for (let i = 0; i < this.opts.x.length; i += 1) {
      result.push(buildCropObject(
        this.opts.width[i],
        this.opts.height[i],
        this.opts.x[i],
        this.opts.y[i],
      ));
    }

    return result;
  }

  run() {
    const command = new FfmpegCommand({
      source: this.opts.input,
    });

    console.log(this.buildFilterArray());
    command.videoFilters(this.buildFilterArray());
    console.log(this.opts.output);
    command.output(this.opts.output);

    command.run();
  }
}
