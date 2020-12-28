const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];

var particle;
var turn = 0;

var gameState = "play";

var divisionHeight=300;
var score =0;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }

    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
       plinkos.push(new Plinko(j,375));
    }    
}

function draw() {
  background("black");

  push();
  stroke("yellow");
  strokeWeight(10);
  line(0, 450, 800, 450);
  pop();

  textSize(20)
  text("Score : "+score,20,30);
  Engine.update(engine);

  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
  /* if(frameCount%60===0){
     particles.push(particle);
     score++;
   } */
  
  for (var k = 0; k < divisions.length; k++) 
  {     
     divisions[k].display();
  }

  if(particle.y>450)
    {
     if(particle.x<400 && particles.x>560)
     {
       score = score+300;
     }
     else if(particle.x>400 && particle.x<560)
     {
       score = score+100;
     }
    }

    particles.push(particle);

    for (var j = 0; j < particles.length; j++) {
   
      particles[j].display();
    }

   //printing scores
   for(var i=20;i<=260;i+=80)
   {
     textSize(24);
     stroke("yellow");
     text("300", i,500)
   }
   
   for(var i=340;i<=420;i+=80)
   {
     textSize(24);
     stroke("yellow");
     text("100", i,500)
   }

   for(var i=500;i<=820;i+=80)
   {
     textSize(24);
     stroke("yellow");
     text("300", i,500)
   }

  


   if(turn===5)
    {
      gameState = "end";
    }

    if(gameState === "end")
    {
      textSize(50)
      stroke("Lime");
      text("Game Over",200, 200);
    }
    if(turn <= 5){
    if(particle.body.position.y>450)
  {
   if(particle.x<400 && particles.x>560)
   {
     score = score+300;
   }
   else if(particle.x>400 && particle.x<560) //this is the particloe whic is gettiong spawned in mousePressed function and i pushed it in array.
   //only score is not calculating
   
   {
     score = score+100;
   }
  }
}

}

function mousePressed()
{
  if(gameState !== "end")
  {
    turn++;
    particle = new Particle(random(width/2-30, width/2+30), 10,10);
  }
}