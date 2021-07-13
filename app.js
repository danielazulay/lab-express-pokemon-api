const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();

// -- Define your route listeners here! --

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));


app.use(express.json());

app.get('/all',(req,res)=>{

    return res.json(allPokemon);
})



app.get('/all/:id',(req,res)=>{

    const id = req.params.id;

  

        const resposta =  allPokemon.find((poke)=>{
          return poke.id.toString()===id
        })
        if(resposta){
            return res.json(resposta)
        }else{
            return res.json({ msg: "Contact not found." });
        }
    
   
})


app.get('/search',(req,res)=>{

    const queryName = req.query
    

  
for(let key in req.query){
        const resposta =  allPokemon.filter((poke)=>{


            if(key==='name'){
                return poke.name===req.query.name
            }else{

                return poke.type.includes(req.query.type)
            }
             
         
        })
        if(resposta){
            return res.json(resposta)
        }else{
            return res.json({ msg: "Contact not found." });
        }

    }
       
    
  
    
   
})
