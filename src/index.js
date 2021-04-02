const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };
  repositories.push(repository)

  return response.status(201).json(repository);//faltava status
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  //const { updatedRepository } = request.body;//chaves adicionada
  const { title, url, techs} = request.body

  const repositoryIndex = repositories.findIndex((repository) => repository.id === id);
//faltava declaração do tipo da variavel
  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories[repositoryIndex].title = title
  repositories[repositoryIndex].url = url
  repositories[repositoryIndex].techs = techs
  //const repository = { ...repositories[repositoryIndex], ...updatedRepository };

  //repositories[repositoryIndex] = repository;
  //console.log(updatedRepository)
  console.log(repositories[repositoryIndex])
  return response.json(repositories[repositoryIndex]).send();
  //return response.json(repository).send();
  
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {//alterado comparação
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const likes = ++repositories[repositoryIndex].likes;

  return response.json({likes: likes}).send();
});

module.exports = app;
