import { DHD } from '../src';

(async () => {
  const dhd = new DHD({
    host: '127.0.0.1',
    token: 'abc123',
    connectionType: 'rest',
    autoConnect: false,
  });

  const data = await dhd.get('/audio/levels/{levelDetectID}', {
    params: {
      levelDetectID: 1,
    },
  });

  console.log('data', data);

  // const anderedata = await dhd.set(
  //   '/audio/selectors/selectors/{selectorID}/left',
  //   {
  //     params: {
  //       selectorID: 1,
  //     },
  //     payload: '40',
  //   },
  // );

  const anderedata = await dhd.set('/audio/selectors/selectors/{selectorID}', {
    params: {
      selectorID: 1,
    },
    payload: {
      left: '40',
    },
  });

  console.log('anderedata', anderedata);

  // dhd.interactWithDHD({
  //   type: 'get',
  //   path: "/audio/levels/{levelDetectID}",
  //   parameters: "",
  // });
})();
