# Cheap Ship

Cheap Ship is a small shoot 'em up game (fixed scroller) you can host in your server.

## Installation

Copy this folder in your web directory, and serve it with your web server.

### Local

You can't play it locally because it uses `fetch` function to serve json files, which is blocked by the same-origin policy

## Screenshots

One day

## Configuration

Configuration file is in `resources/config.js`, it can be changed to suite one needs. Every options are documented.

### Color-scheme

Color-scheme can be changed. One can add a custom one by adding a `<colorsheme-name>.json` in `color-schemes` directory. Color schemes are not well documented *yet*, one can check existing file to create a new one.

### Locale

Available language can be changed. One can add a custom one by adding a `<lang-code>.json` in `locale` directory. Locale are not well documented *yet*, one can check existing file to create a new one. To use this new locale, do not forget to add the \<lang-code\> in the list `CONFIG['lang_available']` AND to define `CONFIG.['user']['lang']` to \<lang-code\>.

### Keyboard Layout

Layout can be changed anytime, default are:
- p to pause the game
- p to unpause the game
- arrows key to move
- space to shoot

see [documentation](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) to know what to type

### User config VS Server config

For now, there is no difference between an user configuration and a server one. That means that every player will get the same settings, including color-scheme and locale. This is not a good system, and it should be upgraded.

## Authors

* **gugus2000** - *initial work*

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## License

This project is licensed under the Beerware License - see the [LICENSE](LICENSE) file for details
