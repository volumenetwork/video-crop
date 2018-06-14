import ffmpeg from 'fluent-ffmpeg';

const defaultOptions = {
  input: '',
  output: ''
};

export default class VideoCrop {
  constructor(options) {
    const o = options || {};
    this.opts = { ...defaultOptions, ...o};
  }

  getOptions() {
    return this.opts;
  }

  run() {

  }
}
