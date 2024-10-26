export function checkNodeVersion() {
  const currentVersion = process.versions.node;
  const majorVersion = currentVersion.split(".")[0];
  if (majorVersion < 14) {
    console.error(
      `Your Node.js version (${currentVersion}) is not supported. Please use Node.js 14.x or higher.`
    );
    process.exit(1);
  }
}
