import chalk from 'chalk';
import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import createService from '../commands/cerateService';

jest.mock('fs-extra');
jest.mock('chalk', () => ({
  green: jest.fn((text) => text),
  red: jest.fn((text) => text),
  cyan: jest.fn((text) => text),
  white: jest.fn((text) => text),
}));

describe('add-service command', () => {
  let consoleLogSpy;
  let consoleErrorSpy;
  let program;
  const testDir = path.join(__dirname, '../backend/services');
  const fileName = 'Test';
  const controllerFilePath = path.join(testDir, `${fileName}.js`);

  beforeAll(() => {
    // Ensure test directories are created before tests run
    fs.ensureDirSync(testDir);
  });

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fs.existsSync.mockReset();
    fs.mkdirSync.mockReset();
    fs.writeFileSync.mockReset();

    program = new Command();
    createService(program);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Clean up test directories after tests complete
    fs.removeSync(testDir);
  });

  it('should create a service file in services directory if it does not exist', () => {
    fs.existsSync.mockReturnValue(false);
    fs.mkdirSync.mockImplementation(() => {});
    fs.writeFileSync.mockImplementation(() => {});

    program.parse(['add-service', fileName], { from: 'user' });

    // Check if the directory was created
    expect(fs.mkdirSync).toHaveBeenCalledWith(
      expect.stringContaining('services'),
      { recursive: true }
    );

    // Check if the service file was created
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining(controllerFilePath),
      expect.any(String)
    );

    // Verify log output
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('✅ Created services directory')
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        `✅ ${fileName} created at services/${fileName}.js`
      )
    );
  });

  it('should log an error if service file creation fails', () => {
    fs.existsSync.mockReturnValue(true);

    const errorMessage = 'File system error';
    fs.writeFileSync.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    program.parse(['add-service', fileName], { from: 'user' });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      chalk.red(`❌ Failed to write service file: ${errorMessage}`)
    );
  });
});
