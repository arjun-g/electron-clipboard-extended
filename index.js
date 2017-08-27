const { clipboard } = require("electron");
const EventEmitter = require("events");
const clipboardEmitter = new EventEmitter();

export const TEXT_CHANGED_EVENT = "text-changed";
export const IMAGE_CHANGED_EVENT = "image-changed";

let watcherId = null;
let previousText = clipboard.readText();
let previousImage = clipboard.readImage();

clipboard.on = (event, listener) => {
  clipboardEmitter.on(event, listener);
  return clipboard;
};

clipboard.once = (event, listener) => {
  clipboardEmitter.once(event, listener);
  return clipboard;
};

clipboard.off = (event, listener) => {
  if (listener) clipboardEmitter.removeListener(event, listener);
  else clipboardEmitter.removeAllListeners(event);
  return clipboard;
};

clipboard.startWatching = ({ watchDelay } = { watchDelay: 500 }) => {
  if (!watcherId)
    watcherId = setInterval(() => {
      if (
        clipboardEmitter.listenerCount(TEXT_CHANGED_EVENT) > 0 &&
        isDiffText(previousText, (previousText = clipboard.readText()))
      ) {
        clipboardEmitter.emit(TEXT_CHANGED_EVENT);
      }

      if (
        clipboardEmitter.listenerCount(IMAGE_CHANGED_EVENT) > 0 &&
        isDiffImage(previousImage, (previousImage = clipboard.readImage()))
      ) {
        clipboardEmitter.emit(IMAGE_CHANGED_EVENT);
      }
    }, watchDelay);

  return clipboard;
};

clipboard.stopWatching = () => {
  if (watcherId) clearInterval(watcherId);
  watcherId = null;
  return clipboard;
};

function isDiffText(str1, str2) {
  return str2 && str1 !== str2;
}

function isDiffImage(img1, img2) {
  return !img2.isEmpty() && img1.toDataURL() !== img2.toDataURL();
}

module.exports = clipboard;
