import readline from 'readline';
import {binarySearch} from './binarySearch';
import {createReadStream, writeFile} from 'fs';

export async function main() {
  let ranks = new Float32Array();

  await readline.createInterface({
    input: createReadStream('src/2021-11-15.allwiki.links.rank', {
      encoding: 'utf-8',
      highWaterMark: 200 * 1024 * 1024
    }),
    terminal: false
  }).on('line', line => {
    const parts = line.split('	');
    const q = Number.parseInt(parts[0].substring(1));
    const rank = Number.parseFloat(parts[1]);
    if (ranks.length < q) {
      console.log(`Resizing ${q}`);
      const newRanks = new Float32Array(q);
      newRanks.set(ranks);
      ranks = newRanks;
    }
    ranks[q] = rank;
  }).on('close', () => {
    const copy = new Float32Array(ranks.length);
    copy.set(ranks);
    copy.sort();

    const normalized = new Uint8Array(ranks.length);

    for (let idx = 0; idx !== ranks.length; idx++) {
      const rank = ranks[idx];
      const t = binarySearch(copy.length, index => copy[index] > rank) / copy.length;
      normalized[idx] = 256 * t;
    }

    writeFile('./out/ranks.bin', normalized, {}, () => {});
  });
}
