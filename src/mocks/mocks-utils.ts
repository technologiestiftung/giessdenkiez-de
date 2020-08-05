let inDemoMode = false;
export function isDemoMode(): boolean {
  return inDemoMode;
}
export function mocksInit(): void {
  if (process.env.BUILD_TARGET && process.env.BUILD_TARGET === 'DEMO') {
    console.log('!!!!!!!!!!!!!!!!!!! This is a DEMO !!!!!!!!!!!!!!!!!!!');
    console.log('------------------------------------------------------');
    console.log('There will be no write interactions with the real API');
    console.log('We will add a the https://github.com/mswjs/msw module');
    console.log('To catch these');
    // const { worker } = require('./mocks/browser');
    // console.log('statrting worker');
    // worker.start();
    import('./browser')
      .then(module => {
        console.log('starting worker');
        module.worker.start();
        inDemoMode = true;
        return;
      })
      .catch(console.error);
  }
}

mocksInit();
