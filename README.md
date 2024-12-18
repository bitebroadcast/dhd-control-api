# DHD Control API

[![CI](https://github.com/bitebroadcast/dhd-control-api/actions/workflows/ci.yml/badge.svg)](https://github.com/bitebroadcast/dhd-control-api/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/dhd-control-api)](https://www.npmjs.com/package/dhd-control-api)
[![license](https://img.shields.io/badge/license-MIT-green)](https://github.com/bitebroadcast/dhd-control-api/blob/main/LICENSE)

### _**Warning:** This library is still under active development and not yet ready for production use. The API is subject to change._

This TypeScript library provides a type-safe interface to DHD audio cores via the new [DHD Control API](https://developer.dhd.audio/docs/API/control-api/), supported in firmware version 10.3 and above. Before using this library, please read the [API usage disclaimer](https://developer.dhd.audio/docs/api/license-agreement/) in the DHD developer documentation.

Please refer to the [official documentation](https://developer.dhd.audio/docs/API/control-api/) for more information on the DHD Control API.

## Installation

This library is available on [npm](npmjs.com/package/dhd-control-api). Install it easily with your preferred package manager:

```sh
pnpm add dhd-control-api
```

## Usage

This library provides a `DHD` class that you can use to interact with a DHD audio core. Once you've created an instance of the `DHD` class, it connects automatically to the DHD device and authenticates using the provided token. You do not have to worry about managing (re)connecting or authentication yourself.

On initialization, the `DHD` class takes an options object with the following properties:

| Property         | Type                  | Required | Default     | Description                                                                                                                                                                                                                      |
| ---------------- | --------------------- | -------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `host`           | `string`              | Yes      |             | The hostname or IP address of the DHD device.                                                                                                                                                                                    |
| `token`          | `string`              | Yes      |             | The token from DHD WebApps user management.                                                                                                                                                                                      |
| `connectionType` | `websocket` \| `rest` | No       | `websocket` | The type of connection to use when connecting to the DHD device. Please note that the connection via REST has a [rate limit of 1 request per second.](https://developer.dhd.audio/docs/API/control-api/rest-usage#rate-limiting) |
| `secure`         | `boolean`             | No       | `false`     | Connect to the DHD device using a secure WebSocket connection or HTTPS-requests.                                                                                                                                                 |
| `autoConnect`    | `boolean`             | No       | `true`      | Connect to the DHD device automatically when the instance is created. Only applies to WebSocket connections.                                                                                                                     |
| `autoReconnect`  | `boolean`             | No       | `true`      | Automatically reconnect to the DHD device if the connection is lost. Only applies to WebSocket connections.                                                                                                                      |

```typescript
import { DHD } from 'dhd-control-api';

const dhd = new DHD({
  host: '10.0.0.1', // IP address of the DHD core
  token: 'dhd-web-apps-token', // Token from DHD WebApps user management
});

(async () => {
  try {
    // Example usage
    // Get data from DHD device
    const levelDetect = await dhd.get('/audio/levels/{levelDetectID}', {
      params: { levelDetectID: 1 },
    });
    const logics = await dhd.get('/control/logics');
    const fader = await dhd.get('/audio/mixers/{mixerID}/faders/{faderID}', {
      params: { mixerID: 1, faderID: 16 },
    });

    // Set parameters in DHD device
    const logic263 = await dhd.set('/control/logics/{logicID}', {
      params: { logicID: 263 },
      payload: { value: true },
    });
    const potentiometer5 = await dhd.set('/audio/pots/{potID}', {
      params: { potID: 5 },
      payload: { value: -12 },
    });
    const faderEq = await dhd.set(
      '/audio/mixers/{mixerID}/faders/{faderID}/params/eq{eqID}',
      {
        params: { mixerID: 1, faderID: 16, eqID: 1 },
        payload: { on: true, gain: 3, frequency: 1250 },
      },
    );
  } catch (error) {
    // Handle errors
    console.error('An error occurred:', error);
  }
})();
```

## Debug logging

This library uses the [debug](https://www.npmjs.com/package/debug) package for logging. To enable debug logging, set the `DEBUG` environment variable to `dhd-control-api:*`:

```sh
DEBUG=dhd-control-api:* node my-app.js
```

---

_BITE Broadcast and this library are not affiliated with or endorsed by DHD Audio GmbH. This is an independent project._
