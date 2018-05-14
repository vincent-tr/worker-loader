'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getWorker = (file, content, options) => {
  const publicPath = options.publicPath ? JSON.stringify(options.publicPath) : '__webpack_public_path__';

  const publicWorkerPath = `${publicPath} + ${JSON.stringify(file)}`;
  const workerType = options.type || 'Worker';
  const workerName = options.name ? JSON.stringify(options.name) : 'undefined';

  if (options.inline) {
    const InlineWorkerPath = JSON.stringify(`!!${_path2.default.join(__dirname, 'InlineWorker.js')}`);

    const fallbackWorkerPath = options.fallback === false ? 'null' : publicWorkerPath;

    return `require(${InlineWorkerPath})(${JSON.stringify(content)}, ${fallbackWorkerPath}, ${workerType}, ${workerName})`;
  }

  return `new ${workerType}(${publicWorkerPath}, ${workerName})`;
}; /* eslint-disable multiline-ternary */
exports.default = getWorker;