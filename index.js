import udp from 'dgram';
import fs from 'fs';
import { mkdirpSync } from 'mkdirp';

const path = 'c:\\rtp-dump\\';

class Dumper {
  async start() {
    const sock = udp.createSocket('udp4');
    const bound = sock.bind(20002);
    const now = Date.now().valueOf();
    const sessionPath = `${path}${now}\\`;
    mkdirpSync(sessionPath);

    let packetCnt = 0;

    bound.addListener('message', (msg) => {
      console.log('got msg', msg.length);
      const filename = `${sessionPath}${packetCnt}.bin`;
      fs.writeFileSync(filename, msg);
      packetCnt++;
    });
  }
}

const dumper = new Dumper();
dumper.start().then(() => {
  console.log('ok');
})
.catch((err) => {
  console.error(err);
});