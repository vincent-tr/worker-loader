// http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string

var URL = window.URL || window.webkitURL;

module.exports = function (content, url, WorkerType, workerOptions) {
  try {
    try {
      var blob;

      try {
        // BlobBuilder = Deprecated, but widely implemented
        var BlobBuilder = window.BlobBuilder ||
        window.WebKitBlobBuilder ||
        window.MozBlobBuilder ||
        window.MSBlobBuilder;

        blob = new BlobBuilder();

        blob.append(content);

        blob = blob.getBlob();
      } catch (e) {
        // The proposed API
        blob = new Blob([content]);
      }

      return new WorkerType(URL.createObjectURL(blob), workerOptions);
    } catch (e) {
      return new WorkerType('data:application/javascript,' + encodeURIComponent(content), workerOptions);
    }
  } catch (e) {
    if (!url) {
      throw Error('Inline worker is not supported');
    }

    return new WorkerType(url, workerOptions);
  }
};
