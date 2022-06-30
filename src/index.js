const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  // Complete aqui

  const { username } = request.headers;

  const listUser = users.find((user) => user.username === username);

  if(!listUser){
    return response.status(400).json({ error: "User Not Found!"});
  }

  request.listUser = listUser;

  return next();
}

// Verifica se Já existe no Banco de dados
function AlreadyExistUser(name){
  
  const exist = users.some((u) => u.name === name);

  return exist;
}

// Rota para criar um novo usuario
app.post('/users', (request, response) => {
  // Complete aqui
  const { name, username } = request.body;

  const exist = AlreadyExistUser(name);

  if(exist){
    return response.status(400).json({ error: "User Already Exist!" });
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: []
  };

  users.push(user);
  
  return response.status(201).json(user); 
});



// Rota para pegar Todos
app.get('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui

  const { listUser } = request;

  return response.json(listUser.todos);

});

// Rota para adicionar um novo Todo
app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const { title, deadline } = request.body;

  const { listUser } = request;

  todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }

  listUser.todos.push(todo);

  return response.status(201).json(todo);
});


// Rota para atualizar title e deadline do todo
app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const { id }  = request.params;
  const { title, deadline } = request.body;
  const { listUser } = request;

  const updateTodo = listUser.todos.find((todo) => todo.id === id);

  updateTodo.title = title;
  updateTodo.deadline = new Date(deadline);

  return response.json(updateTodo);
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;