/* eslint-disable multiline-ternary */
import path from 'path';

const getWorker = (file, content, options) => {
  const publicPath = options.publicPath
    ? JSON.stringify(options.publicPath)
    : '__webpack_public_path__';

  const publicWorkerPath = `${publicPath} + ${JSON.stringify(file)}`;
  const workerType = options.type || 'Worker';
  const workerOptions = { name : options.name };

  if (options.inline) {
    const InlineWorkerPath = JSON.stringify(`!!${
      path.join(__dirname, 'InlineWorker.js')
    }`);

    const fallbackWorkerPath = options.fallback === false
      ? 'null'
      : publicWorkerPath;

    return `require(${InlineWorkerPath})(${JSON.stringify(content)}, ${fallbackWorkerPath}, ${workerType}, ${JSON.stringify(workerOptions)})`;
  }

  return `new ${workerType}(${publicWorkerPath}, ${JSON.stringify(workerOptions)})`;
};

export default getWorker;
