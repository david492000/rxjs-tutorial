import $ from 'jquery';
import Rx from 'rxjs/Rx';

console.log('RxJS Boiler Running...');

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