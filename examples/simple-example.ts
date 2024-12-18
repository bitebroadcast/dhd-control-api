import { DHD } from '@/.';

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
