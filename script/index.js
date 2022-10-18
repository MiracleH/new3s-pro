import infoCollector from "./infoCollector.js";
import tplStart from "./tplReplacer.js";

async function run() {
  const meta = await infoCollector();
  tplStart(meta);
}

run();
