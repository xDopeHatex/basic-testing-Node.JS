// Uncomment the code below and write your tests

import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toBeCalled();
    jest.runAllTimers();
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByInterval(callback, timeout);
    expect(setInterval).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByInterval(callback, timeout);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(timeout * 5);
    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const path = jest.requireActual('path');
    const join = jest.spyOn(path, 'join');
    const pathToFile = 'path/to/file';
    await readFileAsynchronously(pathToFile);
    expect(join).toHaveBeenLastCalledWith(expect.anything(), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const fs = jest.requireActual('fs');
    const existsSync = jest.spyOn(fs, 'existsSync');
    existsSync.mockReturnValue(false);

    const pathToFile = 'path/to/file';
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fs = jest.requireActual('fs');
    const existsSync = jest.spyOn(fs, 'existsSync');
    existsSync.mockReturnValue(true);

    const fsPromises = jest.requireActual('fs/promises');
    const readFile = jest.spyOn(fsPromises, 'readFile');
    const fileContent = 'file content';
    readFile.mockReturnValue(fileContent);

    const pathToFile = 'path/to/file';
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(fileContent);
  });
});
