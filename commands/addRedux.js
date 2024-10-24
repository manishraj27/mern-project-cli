import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";

export default function addReduxCommand(program) {
  program
    .command("add-redux")
    .description("Set up Redux store or add new slice")
    .option("--init", "Initialize Redux setup")
    .option("--slice <sliceName>", "Create a new Redux slice")
    .option("--actions <actions>", "Actions for the slice (comma-separated)")
    .option("--state <state>", "Initial state fields (name:type pairs)")
    .action((options) => {
      const currentDir = process.cwd();
      const isInFrontend = path.basename(currentDir) === "frontend";
      const baseDir = isInFrontend
        ? path.join(currentDir, "src")
        : path.join(currentDir, "frontend/src");

      if (options.init) {
        initializeRedux(baseDir);
      } else if (options.slice) {
        createReduxSlice(baseDir, options);
      }
    });
}

function initializeRedux(baseDir) {
  // Redux store setup in JS
  const storeContent = `
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
reducer: {
// Add reducers here
},
middleware: (getDefaultMiddleware) => getDefaultMiddleware({
serializableCheck: false,
}),
});
`;

  // Redux hooks in JS
  const hooksContent = `
import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
`;

  // Create store directory and files in JS
  const storeDir = path.join(baseDir, "store");

  try {
    fs.mkdirpSync(storeDir);
    fs.mkdirpSync(path.join(storeDir, "slices"));

    fs.writeFileSync(path.join(storeDir, "store.js"), storeContent);
    fs.writeFileSync(path.join(storeDir, "hooks.js"), hooksContent);

    // Update package.json to add Redux dependencies
    const packageJsonPath = path.join(baseDir, "../package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    packageJson.dependencies = {
      ...packageJson.dependencies,
      "@reduxjs/toolkit": "^2.3.0 ",
      "react-redux": "^9.1.2",
    };

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Run npm install
    console.log(chalk.cyan("\n📦 Installing dependencies..."));
    execSync("npm install", { stdio: "inherit" });

    console.log(chalk.green("✅ Redux store initialized successfully"));

    // Show usage example
    console.log(
      chalk.cyan(`
Redux is set up! Here's how you can use it:

1. Add your slices to 'src/store/slices/'.
2. Use 'useAppDispatch' and 'useAppSelector' in your components.
3. Wrap your main application component with the Redux <Provider>.

Example slice creation:
$ devcli add-redux --slice user --actions="login,logout" --state="username:string,isLoggedIn:boolean"

Then import your slice in the store.js and use it in your components.
`)
    );
  } catch (error) {
    console.error(chalk.red(`❌ Failed to initialize Redux: ${error.message}`));
  }
}


function createReduxSlice(baseDir, options) {
  const { slice: sliceName, actions = "", state = "" } = options;

  // Parse actions and state
  const actionList = actions.split(",").map(action => action.trim()).filter(Boolean); // Ensure we have clean action names
  const stateFields = state.split(",").reduce((acc, field) => {
    const [name, type] = field.split(":");
    if (!field.includes(":")) return acc;
    acc[name.trim()] = type === "array" ? [] : type === "boolean" ? false : "";
    return acc;
  }, {});

  // Create slice content
  const sliceContent = `
import { createSlice } from '@reduxjs/toolkit';

const initialState = ${JSON.stringify(stateFields, null, 2)};

const ${sliceName}Slice = createSlice({
  name: '${sliceName}',
  initialState,
  reducers: {${actionList.map(action => `
    ${action}: (state, action) => {
      // Implement ${action} logic here
    }`).join(",")}
  },
});

export const { ${actionList.join(", ")} } = ${sliceName}Slice.actions;
export default ${sliceName}Slice.reducer;
`;

  try {
    const slicePath = path.join(
      baseDir,
      "store",
      "slices",
      `${sliceName}Slice.js`
    );
    fs.writeFileSync(slicePath, sliceContent);

    // Update store.js to include the new reducer
    const storePath = path.join(baseDir, "store", "store.js");
    let storeContent = fs.readFileSync(storePath, "utf8");

    // Add import statement
    const importStatement = `import ${sliceName}Reducer from './slices/${sliceName}Slice';`;
    storeContent = importStatement + "\n" + storeContent;

    // Add reducer to configuration
    storeContent = storeContent.replace(
      "reducer: {",
      `reducer: {\n    ${sliceName}: ${sliceName}Reducer,`
    );

    fs.writeFileSync(storePath, storeContent);

    console.log(
      chalk.green(`✅ Redux slice '${sliceName}' created successfully`)
    );
  } catch (error) {
    console.error(
      chalk.red(`❌ Failed to create Redux slice: ${error.message}`)
    );
  }
}