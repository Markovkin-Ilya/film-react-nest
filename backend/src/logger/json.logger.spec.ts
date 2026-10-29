import { JsonLogger } from './json.logger';

describe('jsonLogger', () => {
  let log;
  const logger = new JsonLogger();

  beforeEach(() => {
    log = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('log correct format', () => {
    logger.warn('test', { optionalTest: 123 });
    expect(log).toBeCalledWith(
      '{"level":"warn","message":"test","optionalParams":[[{"optionalTest":123}]]}',
    );
  });
});
