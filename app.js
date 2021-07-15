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
                return poke.name.includes(req.query.name)
            }

                return poke.types.includes(req.query.types)
            
             
         
        })
        if(resposta){
            return res.json(resposta)
        }else{
            return res.json({ msg: "Contact not found." });
        }

    }


       
    
  
    
   
})


app.post('/new',(req,res)=>{

let poke = req.body

let lastid= allPokemon[allPokemon.length-1].id


let newpoke={...poke,id:lastid+1}
allPokemon.push(newpoke)
return res.json(newpoke)
})



app.put('/editar/:id',(req,res)=>{
    
let formData = req.body

let id= req.params.id
const foundPokemon = allPokemon.find((currentPokemon) => {
    return currentPokemon.id === Number(id);
  });

  if (foundPokemon) {
    // Atualiza o elemento da array com os dados do corpo (body) da requisição
    const index = allPokemon.findIndex((currentPokemon) => {
      return currentPokemon.id === Number(id);
    });

    if (index > -1) {
      allPokemon[index] = { ...foundPokemon, ...formData };

      return res.json(allPokemon[index]);
    } else {
      return res.json({ msg: "Pokemon not found." });
    }

}

})
