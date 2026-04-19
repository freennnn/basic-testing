import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const valueToResolve = 'I am resolved!';
    // Jest implementation of expect(promise).resolves.toBe()
    // try {
    //   const resolvedValue = await promise;
    //   if (resolvedValue === valueToResolve) { // Test Passed }
    //   else { throw new Error('values do not match') }
    // }
    // catch {
    //   Test failed - promise rejected or resolved to a different value
    // }

    await expect(resolveValue(valueToResolve)).resolves.toBe(valueToResolve);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errMsg = 'I am an error';
    // Jest implementation of expect(functionReference).toThrow():
    // const fn = () => throwError();  // arrow function that throws an error
    // try {
    //   fn();  // ← NOW Jest executes it
    //   // If we reach here, no error was thrown - FAIL the test!
    //   throw new Error('Expected function to throw');
    // } catch (error) {
    //   // ✅ Something was thrown, check if it matches expectations
    //   if (/* error matches criteria */) {
    //     // Test passes
    //   }
    // }

    expect(() => throwError(errMsg)).toThrow(errMsg);
  });

  test('should throw error with default message if message is not provided', () => {
    // NO need for wrapper: () => fn() - since we (JEST) don't need to pass arguments to the function here
    expect(throwError).toThrow('Oops');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    // Jest implementaion of expect(promise).rejects.toThrow():
    // try {
    //   await promise;  // Wait for promise
    //   // If we get here, promise resolved - FAIL the test!
    // } catch (rejectionReason) {
    //   // Check if rejectionReason instanceof MyAwesomeError
    //   if (rejectionReason instanceof MyAwesomeError) {
    //     // ✅ Test passes
    //   } else {
    //     // Test fails - wrong error type
    //   }
    // }
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
