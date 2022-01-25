[![Chrome Extension](https://img.shields.io/chrome-web-store/v/hobkagkkamekcjillmnaocokcfeofabd?style=for-the-badge)](https://chrome.google.com/webstore/detail/tarkov-wiki-prices/hobkagkkamekcjillmnaocokcfeofabd)
[![Mozilla Add-on](https://img.shields.io/amo/v/tarkov-wiki-prices?style=for-the-badge)](https://addons.mozilla.org/en-GB/firefox/addon/tarkov-wiki-prices/)

# Tarkov Wiki Prices

Tired of having to keep tabbing between Tarkov and the wiki to see the price of items? Or keeping multiple sites open to track how much the Gunsmith quests are going to set you back? Tire no more! The Tarkov Wiki Prices extension adds current flea market rates to the wiki (data courtesy of [tarkov-tools.com](https://tarkov-tools.com/))!

![Trade example](https://i.imgur.com/SZ9DCEI.png)

# Contributing

To build the addon bundle locally, you can run

```sh
# Install dependencies
npm ci

# Make your changes!

# Build!
make # or `npm run build && npm run assemble` if you don't have make
```

This will emit a bundled copy of the extension into `./dist` which can then be loaded into the browser for testing.
