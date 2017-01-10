import $ from 'jquery';
import Rx from 'rxjs/Rx';

/*console.log('RxJS Boiler Running...');

const btn = $('#btn');
const input = $('#input');

console.log('hello');

const btnStream$ = Rx.Observable.fromEvent(btn, 'click');

btnStream$.subscribe(function(e){
    console.log("Clicked")
},
function(err){
    console.log('Error');

}, function(){
   console.log('Completed');
});


const inputStream$ = Rx.Observable.fromEvent(input, 'keyup');

inputStream$.subscribe(function(e){
        console.log(e.currentTarget.value)
    },
    function(err){
        console.log('Error');

    }, function(){
        console.log('Completed');
    });

const numbers = [33,44,55,66,77];

const numbers$ = Rx.Observable.from(numbers);

numbers$.subscribe(v=>{
    console.log(v)
}, err => {console.log(err)}
,
complete => {
    console.log("completed");
});

const posts = [
    {title: 'Post one', body:'this is the body'},
    {title: 'Post two', body:'this is the body'},
    {title: 'Post three', body:'this is the body'}
];

const posts$ = Rx.Observable.from(posts);

posts$.subscribe(p=>{console.log(p.title)});


const source$ = new Rx.Observable(observer => {
    observer.next('Hello world');
    observer.next('Another value');

    observer.error(new Error("error"));

    setTimeout(()=>{
        observer.next("yet another value");
        observer.complete();
    },3000);
    observer.complete();
});

source$.catch(err => Rx.Observable.of(err)).subscribe(
    x => {
        console.log(x);
    },
    err =>
    {
        console.log(err);
    },
    completed => {
        console.log("completed");
    }
);

Rx.Observable.of('Hello')
.mergeMap(v=>{
    return Rx.Observable.of(v + 'Everyone');
}).subscribe(x=>console.log(x));
*/
//Creating observable

//is nothing than a function that takes an observer
const myObservable = (observer) => {
let i = 0;
const id = setInterval(() => {
    observer.next(i++);
    if(i === 10)
    {
        observer.complete()
    }
}, 200);
 //returns teardown logic
 return () => clearInterval(id);
};
// this is like subscribing
const teardown = myObservable({next(x) {console.log("next " + x)}, error(err) {console.log("error " + err)}, complete(){console.log("complete")}});

setTimeout(()=>{
    teardown();
}, 1000);

//operator is a function that takes an observable and returns and observable
//the operator is going to subscribe to the source observable with its own observer and passing the orignal observer,
// so in other words wrapping one observer inside another one.

const map = (observable, mapFn) =>
{
    (observer) => {
        return observable({
            next(x) {observer.next(mapFn(x))},
            error(err) {observer.error(err)},
            complete() {observer.complete()}
        });
    }
};

const source = map(myObservable, x => x + '!');

const teardown = source({next(x) {console.log(x)}});

