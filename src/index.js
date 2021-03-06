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
function AlreadyExistUser(username){
  
  const exist = users.some((u) => u.username === username);

  return exist;
}

// Rota para criar um novo usuario
app.post('/users', (request, response) => {
  // Complete aqui
  const { name, username } = request.body;

  const exist = AlreadyExistUser(username);

  if(exist){
    return response.status(400).json({ error: 'User Already Exist!' });
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: []
  };

  users.push(user);
  
  return response.status(200).json(user); 
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
  const { id }  = request.params;
  const { title, deadline } = request.body;
  const { listUser } = request;

  const updateTodo = checkTodo(listUser, id);
  if(!updateTodo) {
    return response.status(404).json({ error: 'Todo not Found!' });
  }

  updateTodo.title = title;
  updateTodo.deadline = new Date(deadline);

  return response.status(200).json(updateTodo);
});

// Rota para mudar o status de done para true
app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { id } = request.params;
  const { listUser } = request;

  const updateTodo = checkTodo(listUser, id);

  if(!updateTodo){
    return response.status(404).json({ error: 'Todo not Found!' })
  }

  updateTodo.done = true;

  return response.status(200).json(updateTodo);
});

// Rota para deletar tarefa do usuario por id
app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { id } = request.params;
  const { listUser } = request;

  const updateTodo = checkTodo(listUser, id);

  if(!updateTodo){
    return response.status(404).json({ error: 'Todo not Found!' });
  }

  listUser.todos.splice(updateTodo, 1);

  return response.status(204).send();

});

function checkTodo(listUser, id) {
  
  const resultFind = listUser.todos.find((todo) => todo.id === id)
  
  return resultFind;
}

module.exports = app;