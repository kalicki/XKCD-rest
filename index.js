import polka from 'polka';
import fetch from 'node-fetch';

// lowDB (simple database via JSON)
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync.js';

// Server & Pseudos-env
const { PORT = 3000 } = process.env;
const API = 'https://xkcd.com';
const API_PATH = 'info.0.json';

// Database wrapper
const adapter = new FileSync('db.json');
const db = low(adapter);
const collection = db.defaults({ latestComicNum: 0, comics: [] });
const comics = collection.get('comics');
const latestComicNum = collection.get('latestComicNum');

/**
 * Simple request via GET for API
 * @param {*} path using between domain and info.0.json
 * eg: //xkcd.com/PATH/info.0.json
 */
async function fetchAPI(path) {
  const url = `${API}/${path ? path + `/` + API_PATH : API_PATH}`;

  console.log(`Request to ${url}`);

  const response = await fetch(url);
  return await response.json();
}

/**
 * Get latest comic based in num (ID)
 */
function getLatestComicNum() {
  return latestComicNum.value();
}

/**
 * Get all comics ordered by num (ID) desc
 * @param {*} limit amount of comics that should be returned
 */
function getComics(limit) {
  return comics.take(limit).orderBy('num', ['desc', 'asc']).value();
}

//
/**
 * Get a comic based on num
 * @param {*} num ID of comic
 */
function getComicByNum(num) {
  return comics.find({ num }).value() || false;
}

/**
 * Add new comic via DB
 * @param {*} comic Object with data of comic
 */
function insertComic(comic) {
  // Check if we already have a comic saved
  if (getComicByNum(comic.num)) {
    console.log('Comic already exists', comic.num);
    return;
  }

  // Only save to DB if you don't have the comic
  console.log('Insert comic', comic.num);
  comics.push(comic).write();
}

/**
 * Method for managing a new comic from a request searching the DB or via fetchAPI
 * @param {*} comicNum
 */
async function requestComic(comicNum) {
  // Return comic with num (if exists in DB) or a fetchAPI to capture the comic (last or with num)
  const comic = getComicByNum(comicNum) || (await fetchAPI(comicNum));

  // If there is a new comic then we must update
  const latestComicNum = getLatestComicNum();
  if (comic.num > latestComicNum) {
    collection.set('latestComicNum', comic.num).write();
  }

  // Insertion in DB of a new comic
  insertComic(comic);

  return comic;
}

/**
 * Get the latest comics (support the `limit` via query string eg: `?limit=10`)
 * @param {*} req INTERNAL: Request via Polka
 * @param {*} res INTERNAL: Response via Polka
 * @returns `HTTP 200` OK request
 * @returns `HTTP 400` Bad request
 */
async function getLatestComics(req, res) {
  try {
    const limit = req.query.limit || 10;

    // Check if has new latest comics
    const comic = await requestComic();

    // Here we will always get the previous ones defined in the queryParams (?limit=x)
    let prevComicNum = comic.num - 1;
    for (let index = 1; index < limit; index++) {
      await requestComic(prevComicNum);

      prevComicNum--;
    }

    // We can limit the quantity of comics but we cannot accept a negative number
    const allComics = getComics(Math.abs(limit));

    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(
      JSON.stringify({
        comics: allComics,
        count: allComics.length,
      }),
    );
  } catch (error) {
    res.statusCode = 400;
    res.end('Ops!');
  }
}

/**
 * Get the comic specific via num (ID)
 * @param {*} req INTERNAL: Request via Polka
 * @param {*} res INTERNAL: Response via Polka
 * @returns `HTTP 200` OK request
 * @returns `HTTP 400` Bad request
 */
async function getComic(req, res) {
  try {
    const num = req.params.num || 10;
    const comic = await requestComic(Number(num));

    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(comic));
  } catch (error) {
    res.statusCode = 400;
    res.end('Ops!');
  }
}

/**
 * Start server with routes
 */
const app = polka()
  .get('/comics', getLatestComics)
  .get('/comics/:num', getComic)
  .get('*', (_, res) => res.end(' 🎉 '))
  .listen(PORT, (err) => {
    if (err) {
      throw err;
    }

    // Init lowDB
    collection.write();

    // Simple log
    console.log(`> Running on localhost:${PORT}`);
  });

export {
  fetchAPI,
  getLatestComicNum,
  getComics,
  getComicByNum,
  insertComic,
  requestComic,
  app,
  getLatestComics,
  getComic,
};
