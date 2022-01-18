const express = require('express');
//const chalk = require('chalk');
const debug = require ('debug')('app');


const PORT = process.env.PORT || 3000;
const app = express();
const people =[{
    firstname:'Jonny',
    lastname:'Bravo',
    email:'jonyb@y.com',
    point:1,
    id:1
},
{
firstname:'Lucy',
lastname:'Ann',
email:'lucya@y.com',
point:0,
id:2
},
{
    firstname:'Ayo',
    lastname:'Balogun',
    email:'AyoB@y.com',
    point:2,
    id:2
    }
]

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res)=>{
     res.send('Hello from here')
    //
 })
 const signupRouter =express.Router();
 const authRouter = express.Router();
 const winners = express.Router();

 signupRouter.route('/').get((req, res) =>{
    res.render('signup');

 });
 signupRouter.route('/:id').get((req, res) =>{
    const Id = req.params.id;
    // check if referal link is valid
    const result = people.filter(person => person.id == Id).length
    if(result>0){
        res.render('signup',{Id});
    }
    else{
    
        res.render('signup', {err:-2});
    }

    console.log(Id);
 });
 

authRouter.route('/signUp/').post((req, res)=>{
    const {firstname,lastname, email, refererid} = req.body;
    const Id = req.params.id;
   // increase the referer point
    if(Number(refererid)>=0){
        const result = people.filter(person => person.id === Number(refererid));
        console.log(result);
        result[0].point=result[0].point+1
        console.log(result);
        console.log(people);
    }
    //add new signing to database
    let newPersonId=people.length+1;
    const newPerson ={
        firstname:firstname,
        lastname:lastname,
        email:email,
        point:0,
        id:newPersonId
    }
    people.push(newPerson);
    console.log(people);

   // console.log(req.body);
    res.send(`Thank you ${lastname} for signing up your referal link \n http://localhost:4000/signup/${newPersonId}`);
    // create user
}
)
winners.route('/').get((req, res) =>{
   // let max=people[0].point;
    //persons=[];
    //people.forEach(pep=>{
      //  if (max>pep.point)
    //})
    function compare( a, b ) {
        if ( a.point> b.point ){
          return -1;
        }
        if ( a.point < b.point){
          return 1;
        }
        return 0;
      }
      
      people.sort( compare );
    res.render('winners', {people})

})

 app.use('/signup', signupRouter);
 app.use('/auth', authRouter);
 app.use('/winners', winners);


 app.listen(PORT, ()=>{
    debug(`App is live on ${(PORT)}` );
    console.log(`App is live on ${(PORT)}` );
})