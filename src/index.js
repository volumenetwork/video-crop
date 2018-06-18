import FfmpegCommand from 'fluent-ffmpeg';
import os from 'os';
import VideoCropError from './errors/VideoCropError';

const defaultOptions = {
  input: '',
  output: `${os.homedir()}/out.mp4`,
  x: [0],
  y: [0],
  height: [0],
  width: [0],
  fps: null,
};

function buildCropString(width, height, x, y) {
  return `${width}:${height}:${x}:${y}`;
}

function stringToArray(val) {
  if (Array.isArray(val)) {
    return val;
  }

  return [val];
}

/**
 *
 * @param width
 * @param height
 * @param x
 * @param y
 * @returns {{filter: string, options: string}}
 */
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

    this.opts.x = stringToArray(this.opts.x);
    this.opts.y = stringToArray(this.opts.y);
    this.opts.height = stringToArray(this.opts.height);
    this.opts.width = stringToArray(this.opts.width);

    if (this.opts.x.length !== this.opts.y.length &&
      this.opts.width.length !== this.opts.height.length) {
      throw new VideoCropError('x, y, width and height must be arrays of equal length');
    }
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

  getOutputFilename(i) {
    if (this.opts.x.length === 1) {
      return this.opts.output;
    }

    const tmp = this.opts.output.split('.');
    tmp[tmp.length - 2] = `${tmp[tmp.length - 2]}${i}`;
    return tmp.join('.');
  }

  run() {
    const promises = [];
    for (let i = 0; i < this.opts.x.length; i += 1) {
      promises.push(new Promise(resolve => {
        const command = new FfmpegCommand({
          source: this.opts.input,
        });

        command.on('end', () => {
          resolve();
        });

        if (this.opts.fps !== null) {
          command.fps(this.opts.fps);
        }

        command.complexFilter([buildCropObject(
          this.opts.width[i],
          this.opts.height[i],
          this.opts.x[i],
          this.opts.y[i],
        )]);

        command.output(this.getOutputFilename(i + 1));
        command.run();
      }))
    }

    return Promise.all(promises);
  }
}
