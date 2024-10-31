import chalk from 'chalk';
import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import createRoute from '../commands/createRoute';

jest.mock('fs-extra');
jest.mock('chalk', () => ({
  green: jest.fn((text) => text),
  red: jest.fn((text) => text),
  cyan: jest.fn((text) => text),
  white: jest.fn((text) => text),
}));

describe('add-route command', () => {
  let consoleLogSpy;
  let consoleErrorSpy;
  let program;
  const testDir = path.join(__dirname, '../backend/routes');
  const fileName = 'Test';
  const controllerFilePath = path.join(testDir, `${fileName.toLowerCase()}.js`);

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
    createRoute(program);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Clean up test directories after tests complete
    fs.removeSync(testDir);
  });

  it('should create a route file in routes directory if it does not exist', () => {
    fs.existsSync.mockReturnValue(false);
    fs.mkdirSync.mockImplementation(() => {});
    fs.writeFileSync.mockImplementation(() => {});

    program.parse(['add-route', fileName], { from: 'user' });

    // Check if the directory was created
    expect(fs.mkdirSync).toHaveBeenCalledWith(
      expect.stringContaining('routes'),
      { recursive: true }
    );

    // Check if the route file was created
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining(controllerFilePath),
      expect.any(String)
    );

    // Verify log output
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('✅ Created routes directory')
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        `✅ ${fileName} created at routes/${fileName.toLowerCase()}.js`
      )
    );
  });

  it('should log an error if route file creation fails', () => {
    fs.existsSync.mockReturnValue(true);

    const errorMessage = 'File system error';
    fs.writeFileSync.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    program.parse(['add-route', fileName], { from: 'user' });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      chalk.red(`❌ Failed to write route file: ${errorMessage}`)
    );
  });
});
