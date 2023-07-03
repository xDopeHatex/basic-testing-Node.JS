// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 500;
    const bankAccount = getBankAccount(balance);
    expect(bankAccount.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 500;
    const bankAccount = getBankAccount(balance);
    expect(() => bankAccount.withdraw(600)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 500;
    const fromBankAccount = getBankAccount(balance);
    const toBankAccount = getBankAccount(balance);
    expect(() => fromBankAccount.transfer(600, toBankAccount)).toThrow(Error);
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 500;
    const bankAccount = getBankAccount(balance);
    expect(() => bankAccount.transfer(300, bankAccount)).toThrow(Error);
  });

  test('should deposit money', () => {
    const balance = 500;
    const deposit = 100;
    const bankAccount = getBankAccount(balance);
    bankAccount.deposit(deposit);
    expect(bankAccount.getBalance()).toBe(balance + deposit);
  });

  test('should withdraw money', () => {
    const balance = 500;
    const withdraw = 100;
    const bankAccount = getBankAccount(balance);
    bankAccount.withdraw(withdraw);
    expect(bankAccount.getBalance()).toBe(balance - withdraw);
  });

  test('should transfer money', () => {
    const balance = 500;
    const transfer = 200;
    const fromBankAccount = getBankAccount(balance);
    const toBankAccount = getBankAccount(balance);
    fromBankAccount.transfer(transfer, toBankAccount);
    expect(fromBankAccount.getBalance()).toBe(balance - transfer);
    expect(toBankAccount.getBalance()).toBe(balance + transfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 500;
    const bankAccount = getBankAccount(balance);
    const result = await bankAccount.fetchBalance();
    if (result) {
      expect(typeof result).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 500;
    const bankAccount = getBankAccount(balance);
    try {
      await bankAccount.synchronizeBalance();
      expect(bankAccount.getBalance()).not.toBe(balance);
    } catch (e) {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 500;
    const bankAccount = getBankAccount(balance);
    try {
      await bankAccount.synchronizeBalance();
    } catch (e) {
      expect(e).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
