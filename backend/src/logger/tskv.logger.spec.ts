import { TskvLogger } from './tskv.logger';

describe('tskvLogger', () => {
  let log;
  const logger = new TskvLogger();

  beforeEach(() => {
    log = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('log correct format', () => {
    logger.warn('test', { optionalTest: 123 });
    expect(log).toBeCalledWith(
      'level=warn\tmessage=test\toptional=[[{"optionalTest":123}]]',
    );
  });
});
