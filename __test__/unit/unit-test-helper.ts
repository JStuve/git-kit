import * as chrome from 'sinon-chrome';

export class UnitTestHelper {

    static setupBeforeAndAfter() {
        beforeAll(() => {
            global.chrome = chrome as any;
        });
        afterAll(() => {
            chrome.flush();
        });
    }
}
