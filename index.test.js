import { test } from 'uvu';
import * as assert from 'uvu/assert';
import request from 'supertest';
import { app, fetchAPI, getComicByNum } from './index';

test('should export Polka instance', () => {
  assert.is(app.constructor.name, 'Polka');
  assert.type(app.server.handler, 'undefined');

  assert.type(app.get, 'function');
});

test('should receive "OK" for "GET /" route', async () => {
  const res = await request(app.handler).get('/');

  assert.is(res.status, 200);
  assert.is(res.text, ' 🎉 ');
});

test('should receive 10 (default) comics for "GET /comics" route', async () => {
  const res = await request(app.handler).get('/comics');

  assert.is(res.header['content-type'], 'application/json');
  assert.is(res.status, 200);
  assert.is(res.body.count, 10);
});

test('should receive 15 (default) comics for "GET /comics?limit=15" route', async () => {
  const res = await request(app.handler).get('/comics?limit=15');

  assert.is(res.header['content-type'], 'application/json');
  assert.is(res.status, 200);
  assert.is(res.body.count, 15);
});

test('should receive the specified comic for "GET /comics/:id" route', async () => {
  const res = await request(app.handler).get('/comics/2351');

  assert.is(res.header['content-type'], 'application/json');
  assert.is(res.status, 200);
  assert.type(res.body, 'object');
  assert.ok(getComicByNum(2351));
});

test('should receive the last comic and save to DB', async () => {
  const resp = await request(app.handler).get('/comics');
  const respComic = await fetchAPI();

  assert.type(resp.body, 'object');
  assert.type(respComic, 'object');
  assert.ok(getComicByNum(respComic.num));
});

test('should make sure that the comic by NUM exists in the DB', async () => {
  assert.ok(getComicByNum(20));
});

test('should make sure that the comic by NUM dont exists in the DB', async () => {
  assert.ok(!getComicByNum(-1));
});

test.run();
