import debug from 'debug';

const log = {
  debug: debug('dhd-control-api:debug'),
  error: debug('dhd-control-api:error'),
  info: debug('dhd-control-api:info'),
  warn: debug('dhd-control-api:warn'),
};

log.error.color = '1';
log.info.color = '2';
log.debug.color = '4';
log.warn.color = '3';

export { log };
