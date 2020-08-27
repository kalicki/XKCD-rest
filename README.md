# Simple XKCD

Simple API with Polka server and lowDB, that consumes https://xkcd.com

API:
Latests: https://xkcd.com/info.0.json
Get specified: https://xkcd.com/NUM_ID/info.0.json

## Docker

Build: `docker build -t xkcd-api .`
Run: `docker run -p 3080:3080 xkcd-api`

## CLI

1 - Install Node and Yarn
2 - `yarn install`
3 - In terminal run: `node index.js` or `yarn start`
4 - Check expose localhost in terminal

## Examples

# Get comics (by default returns the last 10)

`curl http://localhost:3000/comics/`

```
{"comics":[{"month":"8","num":2351,"link":"","year":"2020","news":"","safe_title":"Standard Model Changes","transcript":"","alt":"Bugs are spin 1/2 particles, unless it's particularly windy.","img":"https://imgs.xkcd.com/comics/standard_model_changes.png","title":"Standard Model Changes","day":"26"},{"month":"8","num":2350,"link":"","year":"2020","news":"","safe_title":"Deer Turrets","transcript":"","alt":"When my great grandfather designed the Titanic and it hit an iceberg and sank, he didn't sit around moping. He took those lessons to his next job designing airships, and he made the Hindenburg completely iceberg-proof!","img":"https://imgs.xkcd.com/comics/deer_turrets.png","title":"Deer Turrets","day":"24"},{"month":"8","num":2349,"link":"","year":"2020","news":"","safe_title":"Rabbit Introduction","transcript":"","alt":"Washington state is seeing great success with reintroducing the Columbia River Basin subpopulation. We cannot allow them to further widen the interstate bun gap.","img":"https://imgs.xkcd.com/comics/rabbit_introduction.png","title":"Rabbit Introduction","day":"21"},{"month":"8","num":2348,"link":"","year":"2020","news":"","safe_title":"Boat Puzzle","transcript":"","alt":"'No, my cabbage moths have already started laying eggs in them! Send the trolley into the river!' 'No, the sailing wolf will steal the boat to rescue them!'","img":"https://imgs.xkcd.com/comics/boat_puzzle.png","title":"Boat Puzzle","day":"19"},{"month":"8","num":2347,"link":"","year":"2020","news":"","safe_title":"Dependency","transcript":"","alt":"Someday ImageMagick will finally break for good and we'll have a long period of scrambling as we try to reassemble civilization from the rubble.","img":"https://imgs.xkcd.com/comics/dependency.png","title":"Dependency","day":"17"},{"month":"8","num":2346,"link":"","year":"2020","news":"","safe_title":"COVID Risk Comfort Zone","transcript":"","alt":"I'm like a vampire, except I'm not crossing that threshold even if you invite me.","img":"https://imgs.xkcd.com/comics/covid_risk_comfort_zone.png","title":"COVID Risk Comfort Zone","day":"14"},{"month":"8","num":2344,"link":"","year":"2020","news":"","safe_title":"26-Second Pulse","transcript":"","alt":"There are some papers arguing that there's a volcanic component, but I personally think they're just feeling guilty and trying to cover the trail.","img":"https://imgs.xkcd.com/comics/26_second_pulse.png","title":"26-Second Pulse","day":"10"},{"month":"8","num":2343,"link":"","year":"2020","news":"","safe_title":"Mathematical Symbol Fight","transcript":"","alt":"Oh no, a musician just burst in through the door confidently twirling a treble clef.","img":"https://imgs.xkcd.com/comics/mathematical_symbol_fight.png","title":"Mathematical Symbol Fight","day":"7"},{"month":"8","num":2342,"link":"","year":"2020","news":"","safe_title":"Exposure Notification","transcript":"","alt":"I don't see why everyone is so hungry for BAD news, but fine, I'll give in to feedback and add a dark mode.","img":"https://imgs.xkcd.com/comics/exposure_notification.png","title":"Exposure Notification","day":"5"},{"month":"1","num":20,"link":"","year":"2006","news":"","safe_title":"Ferret","transcript":"[[A ferret with airplane wings on it]]\nFriend: Why on earth did you make those wings? You don't seriously think they could let your ferret fly, right?\nGuy: I... of course not.\nGuy: That would be pretty dumb. It's just, uh... ...a Halloween costume.\nFriend: oh, okay.\nFriend: Besides, who would want a pet to fly anyway?\nGuy: Yeah. Pretty lame, huh?\nFriend: Anyway, let's go play video games.\n[[Friend leaves]]\n[[Friend is gone, and Guy is looking at ferret]]\n[[Guy imagines ferret flying over the ocean near the beach using his makeshift wings]]\n{{title text: My brother had a ferret he loved which died since I drew this strip. RIP.}}","alt":"My brother had a ferret he loved which died since I drew this strip.  RIP.","img":"https://imgs.xkcd.com/comics/ferret.jpg","title":"Ferret","day":"1"}],"count":10}
```

# Get comics with `limit` (using query string to determine the amount)

`curl http://localhost:3000/comics/?limit=5`

```
{"comics":[{"month":"8","num":2351,"link":"","year":"2020","news":"","safe_title":"Standard Model Changes","transcript":"","alt":"Bugs are spin 1/2 particles, unless it's particularly windy.","img":"https://imgs.xkcd.com/comics/standard_model_changes.png","title":"Standard Model Changes","day":"26"},{"month":"8","num":2348,"link":"","year":"2020","news":"","safe_title":"Boat Puzzle","transcript":"","alt":"'No, my cabbage moths have already started laying eggs in them! Send the trolley into the river!' 'No, the sailing wolf will steal the boat to rescue them!'","img":"https://imgs.xkcd.com/comics/boat_puzzle.png","title":"Boat Puzzle","day":"19"},{"month":"8","num":2346,"link":"","year":"2020","news":"","safe_title":"COVID Risk Comfort Zone","transcript":"","alt":"I'm like a vampire, except I'm not crossing that threshold even if you invite me.","img":"https://imgs.xkcd.com/comics/covid_risk_comfort_zone.png","title":"COVID Risk Comfort Zone","day":"14"},{"month":"8","num":2344,"link":"","year":"2020","news":"","safe_title":"26-Second Pulse","transcript":"","alt":"There are some papers arguing that there's a volcanic component, but I personally think they're just feeling guilty and trying to cover the trail.","img":"https://imgs.xkcd.com/comics/26_second_pulse.png","title":"26-Second Pulse","day":"10"},{"month":"1","num":20,"link":"","year":"2006","news":"","safe_title":"Ferret","transcript":"[[A ferret with airplane wings on it]]\nFriend: Why on earth did you make those wings? You don't seriously think they could let your ferret fly, right?\nGuy: I... of course not.\nGuy: That would be pretty dumb. It's just, uh... ...a Halloween costume.\nFriend: oh, okay.\nFriend: Besides, who would want a pet to fly anyway?\nGuy: Yeah. Pretty lame, huh?\nFriend: Anyway, let's go play video games.\n[[Friend leaves]]\n[[Friend is gone, and Guy is looking at ferret]]\n[[Guy imagines ferret flying over the ocean near the beach using his makeshift wings]]\n{{title text: My brother had a ferret he loved which died since I drew this strip. RIP.}}","alt":"My brother had a ferret he loved which died since I drew this strip.  RIP.","img":"https://imgs.xkcd.com/comics/ferret.jpg","title":"Ferret","day":"1"}],"count":5}
```

# Get a specific comic via NUM (ID)

`curl http://localhost:3000/comics/2311`

````
{"month":"","num":2311,"link":"","year":"2020","news":"","safe_title":"Confidence Interval","transcript":"","alt":"The worst part is that's the millisigma interval.","img":"https://imgs.xkcd.com/comics/confidence_interval.png","title":"Confidence Interval","day":"25"}
```

### Requirements:
NodeJS >= 12.18.3
Yarn => 1.22.4
````
