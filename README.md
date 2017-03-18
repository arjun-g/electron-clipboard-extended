# Electron Clipboard Extended
>Electron clipboard extended with event handler for Text and Image change

```bash
npm install electron-clipboard-extended
```

This library has all methods of electron's clipboard api with added functionalities for listening to changes in clipboard. As of now only Text and Image changes are captured.

## Usage

```javascript
const clipboard = require('electron-clipboard-extended')

clipboard
.on('text-changed', () => {
    let currentText = clipboard.readText()
})
.once('text-changed', () => {
    console.log('TRIGGERED ONLY ONCE')
})
.on('image-changed', () => {
    let currentIMage = clipboard.readImage()
})
.startWatching();

clipboard.off('text-changed');

clipboard.stopWatching();

```

## Methods

All methods of electron's clipboard api plus the methods listed below

### startWatching()
Returns clipboard - Chainable method, Only after startWatching is called changes to clipboard will be watched.

### stopWatching()
Returns clipboard - Chainable method, Changes to clipboard will not be watched after calling this

### on(event, listener), once(event, listener)
* `event` String - Can be either `text-changed` or `image-changed`
* `listener` Function - Callback function

Returns clipboard - Chainable method

### off(event[, listener])
* `event` String - Can be either `text-changed` or `image-changed`
* `listener` Function (optional) - If `listener` is not passed all listeners of the event will be removed

Returns clipboard - Chainable method