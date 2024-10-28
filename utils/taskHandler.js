import chalk from 'chalk';

export function taskHandler(
  fn,
  initiating_message = '',
  success_message = '',
  error_message = ''
) {
  try {
    console.log(chalk.yellow(initiating_message));
    fn();
    console.log(chalk.green(success_message));
  } catch (error) {
    console.log(chalk.red(error_message));
    console.log(error);
    process.exit(1);
  }
}
