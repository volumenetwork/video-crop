import VideoCrop from '../src/index.js';

test('Default options not required in constructor', () => {
  const vc = new VideoCrop();

  const o = vc.getOptions();
  expect(o.input).toBe('');
  expect(o.output).toBe('');
});

test('Can define input file from constructor', () => {
  const vc = new VideoCrop({
    input: './path/to/file.mp4'
  });

  const o = vc.getOptions();

  expect(o.input).toBe('./path/to/file.mp4');
});

test('Can define output file from constructor', () => {
  const vc = new VideoCrop({
    output: './path/to/file.mp4'
  });

  const o = vc.getOptions();

  expect(o.output).toBe('./path/to/file.mp4');
});