import fs from 'fs';
import readline from 'readline';

export async function main() {
  const ranks: { [key: string]: string } = {};

  await readline.createInterface({
    input: fs.createReadStream('src/2021-11-15.allwiki.links.rank', 'utf-8'),
    terminal: false
  }).on('line', line => {
    const parts = line.split('	');
    ranks[parts[0]] = parts[1];
  });

  fs.writeFile('./out/ranks.json', JSON.stringify(ranks, null, 2), () => {
  });
}
