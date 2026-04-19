import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';

jest.mock('path');
jest.mock('fs/promises');
jest.mock('fs');

const mockedJoin = jest.mocked(join);
const mockedReadFile = jest.mocked(readFile);
const mockedExistsSync = jest.mocked(existsSync);

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 100;
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 100;

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
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
    const callback = jest.fn();
    const timeout = 100;
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timeout);
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 100;
    const repeat = 5;
    doStuffByInterval(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout * repeat);
    expect(callback).toHaveBeenCalledTimes(repeat);
  });
});

describe('readFileAsynchronously', () => {
  const filePath = './phantom-file.txt';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    mockedExistsSync.mockReturnValue(true);
    mockedReadFile.mockResolvedValue(Buffer.from(''));
    mockedJoin.mockReturnValue('/some/path');

    await readFileAsynchronously(filePath);
    expect(mockedJoin).toHaveBeenCalledWith(__dirname, filePath);
  });

  test('should return null if file does not exist', async () => {
    mockedExistsSync.mockReturnValue(false);
    const content = await readFileAsynchronously(filePath);
    expect(content).toBe(null);
  });

  test('should return file content if file exists', async () => {
    mockedExistsSync.mockReturnValue(true);
    const fakeContent = 'Tests are for half-hearted, but we are brave!';
    mockedReadFile.mockResolvedValue(Buffer.from(fakeContent));
    const readContent = await readFileAsynchronously(filePath);
    expect(readContent).toBe(fakeContent);
  });
});
