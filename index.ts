import { Subject, interval } from 'rxjs';
import { take, tap, multicast, mapTo, endWith } from 'rxjs/operators';

//https://www.learnrxjs.io/learn-rxjs/operators/multicasting/multicast

// Example 1: multicast with standard Subject
//emit every 2 seconds, take 5
const srcInterval = interval(2000).pipe(take(5));

const example = srcInterval.pipe(
  //since we are multicasting below, side effects will be executed once
  tap((x) => console.log('Side Effect #1_' + x)),
  mapTo('Result!'),
  endWith('<----end---->')
);

//subscribe subject to source upon connect()
const multi = example.pipe(multicast(() => new Subject()));
/*
  subscribers will share source
  output:
  "Side Effect #1"
  "Result!"
  "Result!"
  ...
*/
const subscriberOne = multi.subscribe((val) => console.log(val));
const subscriberTwo = multi.subscribe((val) => console.log(val));
//subscribe subject to source
multi.connect();
