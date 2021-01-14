const Mustache = require('mustache');
const fetch = require('node-fetch');
const fs = require('fs');

const MUSTACHE_TEMPLATE = './template.html';
let DATA = {};

async function generateReadMe() {
  fs.readFile(MUSTACHE_TEMPLATE, (err, data) => {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}

async function getLastPosts() {
  const r = await fetch(
    `https://cristianpb.github.io/api/github-pages.json`
  )
  const res = await r.json()
  DATA.last_posts = res.slice(0, 3);
}

async function action() {

  await getLastPosts()

  await generateReadMe();
}

action();
