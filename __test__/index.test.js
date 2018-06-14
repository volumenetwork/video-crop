/* global test, expect */

import os from 'os';
import VideoCrop from '../src/index';


test('Default options not required in constructor', () => {
  const vc = new VideoCrop();

  const o = vc.getOptions();
  expect(o.input).toBe('');
  expect(o.output).toBe(`${os.homedir()}/out.mp4`);
});

test('Can define input file from constructor', () => {
  const vc = new VideoCrop({
    input: './path/to/file.mp4',
  });

  const o = vc.getOptions();

  expect(o.input).toBe('./path/to/file.mp4');
});

test('Can define output file from constructor', () => {
  const vc = new VideoCrop({
    output: './path/to/file.mp4',
  });

  const o = vc.getOptions();

  expect(o.output).toBe('./path/to/file.mp4');
});

test('Output string is unmodified if only only one crop specified', () => {
  const vc = new VideoCrop({
    output: './path/to/file.mp4',
  });

  expect(vc.getOutputFilename()).toBe('./path/to/file.mp4');
  expect(vc.getOutputFilename(5)).toBe('./path/to/file.mp4');
});

test('Output string is modified if multiple crops specified', () => {
  const vc = new VideoCrop({
    output: './path/to/file.mp4',
    x: [1, 2],
    y: [3, 4],
    height: [5, 6],
    width: [7, 8],
  });

  expect(vc.getOutputFilename(3)).toBe('./path/to/file3.mp4');
  expect(vc.getOutputFilename(5)).toBe('./path/to/file5.mp4');
});

test('x, y, height and width options are arrays when number given', () => {
  const vc = new VideoCrop({
    output: './path/to/file.mp4',
    x: 1,
    y: 2,
    height: 3,
    width: 4,
  });

  const o = vc.getOptions();

  expect(o.x).toEqual(expect.arrayContaining([1]));
  expect(o.x.length).toBe(1);
  expect(o.y).toEqual(expect.arrayContaining([2]));
  expect(o.y.length).toBe(1);
  expect(o.height).toEqual(expect.arrayContaining([3]));
  expect(o.height.length).toBe(1);
  expect(o.width).toEqual(expect.arrayContaining([4]));
  expect(o.width.length).toBe(1);
});

test('x, y, height and width options are arrays when arrays given', () => {
  const vc = new VideoCrop({
    output: './path/to/file.mp4',
    x: [1, 2],
    y: [2, 3],
    height: [3, 4],
    width: [4, 5],
  });

  const o = vc.getOptions();

  expect(o.x).toEqual(expect.arrayContaining([1, 2]));
  expect(o.x.length).toBe(2);
  expect(o.y).toEqual(expect.arrayContaining([2, 3]));
  expect(o.y.length).toBe(2);
  expect(o.height).toEqual(expect.arrayContaining([3, 4]));
  expect(o.height.length).toBe(2);
  expect(o.width).toEqual(expect.arrayContaining([4, 5]));
  expect(o.width.length).toBe(2);
});