const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  // Complete aqui
}

// Verifica se Já existe no Banco de dados
function AlreadyExistUser(name){
  
  const exist = users.some((user) => user.name === name);

  return exist;
}

// Rota para criar um novo usuario
app.post('/users', (request, response) => {
  // Complete aqui
  const { name, username} = request.body;

  const exist = AlreadyExistUser(name);

  if(!exist){
    return response.status(400).json({ error: "User Already Exist!" });
  }

  const id = uuidv4();
  
  users.push({
    id,
    name,
    username,
    todos: []
  });
  
  return response.status(201).send() 
});



app.get('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;