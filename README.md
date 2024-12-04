# DHD Control API

[![CI](https://github.com/bitebroadcast/dhd-control-api/actions/workflows/ci.yml/badge.svg)](https://github.com/bitebroadcast/dhd-control-api/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/dhd-control-api)](https://www.npmjs.com/package/dhd-control-api)
[![license](https://img.shields.io/badge/license-MIT-green)](https://github.com/bitebroadcast/dhd-control-api/blob/main/LICENSE)

### _**Warning:** This library is still under active development and not yet ready for production use. The API is subject to change._

This TypeScript library provides a type-safe interface to DHD audio cores via the new [DHD Control API](https://developer.dhd.audio/docs/API/control-api/), supported in firmware version 10.3 and above. Before using this library, please read the [API usage disclaimer](https://developer.dhd.audio/docs/api/license-agreement/) in the DHD developer documentation.

Please refer to the [official documentation](https://developer.dhd.audio/docs/API/control-api/) for more information on the API.

## Installation

This library is available on [npm](npmjs.com/package/dhd-control-api). Install it easily with your preferred package manager:

```sh
pnpm add dhd-control-api
```

## Debug logging

This library uses the [debug](https://www.npmjs.com/package/debug) package for logging. To enable debug logging, set the `DEBUG` environment variable to `dhd-control-api:*`:

```sh
DEBUG=dhd-control-api:* node my-app.js
```

---

_BITE Broadcast and this library are not affiliated with or endorsed by DHD Audio GmbH. This is an independent project._
