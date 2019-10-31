import {expect, assert} from 'chai';
import {SpectronClient} from 'spectron';

import commonSetup from './common-setup';

describe('Nota App', function () {
  commonSetup.apply(this);

  let browser: any;
  let client: SpectronClient;

  beforeEach(function () {
    client = this.app.client;
    browser = client as any;
  });

  it('creates initial windows', async function () {
    const count = await client.getWindowCount();
    expect(count).to.equal(1);
  });

});
