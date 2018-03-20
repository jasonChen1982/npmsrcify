npmsrcify
=============

[![npm](https://img.shields.io/npm/v/npmsrcify.svg?style=flat-square)](https://github.com/jasonChen1982/npmsrcify)
[![javascript style guide](https://img.shields.io/badge/code_style-google-brightgreen.svg)](https://google.github.io/styleguide/jsguide.html)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)

## Introduction

resourceify your npm package from node_modules to a specify directory which you want

## Usage

install package

```sh
npm i -D npmsrcify
```

config which package need to move, and move to which directory

> package.json
```json
{
  "config": {
    "npmsrcify": {
      "modules": [
        "dat.gui",
        "stats.js",
        "three"
      ],
      "output": "./lib"
    }
  }
}
```

run command

```sh
npmsrcify extract
```
