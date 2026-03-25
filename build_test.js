import { build } from 'vite';
import fs from 'fs';

async function runBuild() {
  try {
    await build({ logLevel: 'error' });
    console.log("Build Success");
  } catch (err) {
    fs.writeFileSync('err.json', JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
    console.log("Build Failed, logged to err.json");
  }
}

runBuild();
