const express = require('express');
const covid = require('novelcovid');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');


app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.listen(PORT, ()=>{
    console.log(`listencing on the port ${PORT}`)
})

async function getStats(stateInput){
    let state = await covid.states({state:stateInput});
    return state;
}

app.get('/',function(req,res){
    res.render('index',{state:'',cases:'',deaths:''})
})  

app.post('/',function(req,res){
    let state = req.body.state;
    getStats(state).then(response=>{
        res.render('index',{state:state,cases:response.cases,deaths:response.deaths})
    });
})