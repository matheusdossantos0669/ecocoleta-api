
const express = require('express');
const router = express.Router();
const db = require('../database/database');

// Listar materiais
router.get('/', (req, res) => {
  const materiais = db.prepare(
    'SELECT * FROM materiais ORDER BY nome'
  ).all();

  res.json(materiais);
});

// Cadastrar material
router.post('/', (req, res) => {
  const { nome, descricao } = req.body;

  if (!nome || !nome.trim()) {
    return res.status(400).json({
      erro: 'Nome do material é obrigatório'
    });
  }

  try {
    const resultado = db.prepare(`
      INSERT INTO materiais (nome, descricao)
      VALUES (?, ?)
    `).run(nome.trim(), descricao || null);

    res.status(201).json({
      mensagem: 'Material cadastrado com sucesso',
      id: resultado.lastInsertRowid
    });
  } catch (error) {
    res.status(error.code === 'SQLITE_CONSTRAINT_UNIQUE' ? 409 : 500).json({
      erro: error.code === 'SQLITE_CONSTRAINT_UNIQUE'
        ? 'Material já cadastrado'
        : 'Erro ao cadastrar material'
    });
  }
});

// Atualizar material
router.put('/:id', (req, res) => {
  const { nome, descricao } = req.body;

  if (!nome || !nome.trim()) {
    return res.status(400).json({
      erro: 'Nome do material é obrigatório'
    });
  }

  try {
    const resultado = db.prepare(`
      UPDATE materiais
      SET nome = ?, descricao = ?
      WHERE id = ?
    `).run(nome.trim(), descricao || null, req.params.id);

    if (!resultado.changes) {
      return res.status(404).json({
        erro: 'Material não encontrado'
      });
    }

    res.json({ mensagem: 'Material atualizado com sucesso' });
  } catch (error) {
    res.status(error.code === 'SQLITE_CONSTRAINT_UNIQUE' ? 409 : 500).json({
      erro: 'Não foi possível atualizar o material'
    });
  }
});

// Excluir material
router.delete('/:id', (req, res) => {
  try {
    const resultado = db.prepare(
      'DELETE FROM materiais WHERE id = ?'
    ).run(req.params.id);

    if (!resultado.changes) {
      return res.status(404).json({
        erro: 'Material não encontrado'
      });
    }

    res.json({ mensagem: 'Material excluído com sucesso' });
  } catch (error) {
    res.status(409).json({
      erro: 'Não é possível excluir: existem solicitações vinculadas'
    });
  }
});

module.exports = router;
