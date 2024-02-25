let player1 = document.querySelector(".player1");
let player2 = document.querySelector(".player2");
let ball=document.querySelector(".ball")
let px=50,py=50;
let ballx=50,bally=50,ballv=0;
let key={};
let game=0;
let direction;

let score1=document.querySelector(".score1");
let score2=document.querySelector(".score2");
let num1=0,num2=0;

let name1=document.querySelector(".name1");
let name2=document.querySelector(".name2");

document.documentElement.addEventListener('keydown', function(event){
    key[event.key]=true;
});
document.documentElement.addEventListener('keyup', function(event){
    key[event.key]=false;
});

player1.addEventListener('touchmove',touch1);
player2.addEventListener('touchmove',touch2);

window.addEventListener('gamepadconnected', function(event){
    // let gamepad = event.gamepad;
    // console.log("gamepad connected");
    // console.log(gamepad);
    // console.log(event.gamepad);
    console.log(navigator.getGamepads()[0]);
    console.log(navigator.getGamepads()[1]);
    // console.log(navigator.getGamepads()[event.gamepad.index]);
    const x=setInterval(()=>barMove(event), 5);
    key[event.key]=true;
});

function touch1(e)
{
    let a=e.changedTouches[0];
    let stx=a.pageX;
    let sty=a.pageY;
    py=100*sty/1080;
    player1.style.top=py+"vh";
    console.log(stx,sty);
    if (!game) startGame(player1);
}

function touch2(e)
{
    let a=e.changedTouches[0];
    let stx=a.pageX;
    let sty=a.pageY;
    px=100*sty/1080;
    player2.style.top=px+"vh";
    console.log(stx,sty);
    if (!game) startGame(player2);
}

function keyboard()
{
    if (key['w']==true)
    {
        if (py>=5.5) py-=0.5;
        player1.style.top=py+"vh";
        if (!game) startGame(player1);
    }
    if (key['s']==true)
    {
        if (py<=94.5) py+=0.5;
        player1.style.top=py+"vh";
        if (!game) startGame(player1);
    }

    if (key['ArrowUp']==true)
    {
        if (px>=5.5) px-=0.5;
        player2.style.top=px+"vh";
        if (!game) startGame(player2);
    }
    if (key['ArrowDown']==true)
    {
        if (px<=94.5) px+=0.5;
        player2.style.top=px+"vh";
        if (!game) startGame(player2);
    }
}

function reload()
{
    alert("end game");
if(!alert('Alert For your User!')){window.location.reload();}
}

function ballMove()
{
    console.log(ballv);
    if (direction=="left")
    {
        ballx-=0.2;
        ball.style.left=ballx+"vw";
    }
    if (direction=="right")
    {
        ballx+=0.2;
        ball.style.left=ballx+"vw";
    }

    if (Math.abs(ballx - 6) <= 0.01)
    {
        if (bally>py-6 && bally<py+6)
        {
            direction="right";
            ballv=bally-py;
        }
        console.log("right");
    }
    if (Math.abs(ballx - 94) <= 0.01)
    {
        if (bally>px-6 && bally<px+6)
        {
            direction="left";
            ballv=bally-px;
        }
        console.log("left");
    }
    if (Math.abs(bally-95)<=1)
    {
        console.log("down down down");
        ballv=-ballv;
    }
    if (Math.abs(bally-5)<=1)
    {
        console.log("up up up");
        ballv=-ballv;
    }
    if (ballx<3 || ballx>97) 
    {
        if (ballx>97)
        {
            num1++;
            score1.textContent=num1;
            score1.style.color="green";
            setTimeout(()=>{
                score1.style.color="white";
            },1000);
        }
        if (ballx<3)
        {
            num2++;
            score2.textContent=num2;
            score2.style.color="green";
            setTimeout(()=>{
                score2.style.color="white";
            },1000);
        }
        direction="none";

        ballx=50,bally=50,ballv=0;
        game=0;
        ball.style.left=ballx+"vw";
        ball.style.top=bally+"vh";

        px=50,py=50;
        player1.style.top=py+"vh";
        player2.style.top=px+"vh";

        if(num1>=10 || num2>=10)
        {
            if (num1>=10)
            {
                let str=name1.value+" WON\ngame will restart";
                alert(str);
            }
            if (num2>=10)
            {
                let str=name2.value+" WON\ngame will restart";
                alert(str);
            }
            location.reload();
        }
    }
    bally+=ballv*0.05;
    ball.style.top=bally+"vh";
}

function barMove(e)
{
    //console.log(e);
    let axes= new Array(4);
    let axis= new Array(4);
    //axes=navigator.getGamepads()[0].axes;   // m-am gandit ca se iau axele  ctrl1 x y ctrl2 x y
    axes=navigator.getGamepads()[0].axes;
    axis=navigator.getGamepads()[1].axes;
    // console.log(axes,axis);
    // console.log(navigator.getGamepads()[e.gamepad.index]);              // nu functioneaza ca e undefined
    // for (let i=0;i<4;i++) console.log(axes[i]);
    if (axis[3]<-0.1)
    {
        if (py>=5.5) py-=0.15;
        player1.style.top=py+"vh";
        if (!game) startGame(player1);
    }
    if (axis[3]>0.1)
    {
        if (py<=94.5) py+=0.15;
        player1.style.top=py+"vh";
        if (!game) startGame(player1);
    }
    if (axes[3]<-0.1)
    {
        if (px>=5.5) px-=0.15;
        player2.style.top=px+"vh";
        if (!game) startGame(player2);
    }
    if (axes[3]>0.1)
    {
        if (px<=94.5) px+=0.15;
        player2.style.top=px+"vh";
        if (!game) startGame(player2);
    }
}

setInterval(keyboard, 5);
let ballInterval=setInterval(ballMove, 5);
// let gamepadInterval=setInterval(barMove, 5);

function startGame(x)
{
    game=1;
    if (x==player1)
    {
        console.log("game by 1");
        direction="left";
    }
    if (x==player2)
    {
        console.log("game by 2");
        direction="right";
    }
}