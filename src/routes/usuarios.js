
const express = require('express');
const router = express.Router();
const db = require('../database/database');

// Listar usuários
router.get('/', (req, res) => {
  const usuarios = db.prepare(
    'SELECT * FROM usuarios ORDER BY id DESC'
  ).all();

  res.json(usuarios);
});

// Buscar usuário por ID
router.get('/:id', (req, res) => {
  const usuario = db.prepare(
    'SELECT * FROM usuarios WHERE id = ?'
  ).get(req.params.id);

  if (!usuario) {
    return res.status(404).json({
      erro: 'Usuário não encontrado'
    });
  }

  res.json(usuario);
});

// Cadastrar usuário
router.post('/', (req, res) => {
  const { nome, email, telefone } = req.body;

  if (!nome || !email) {
    return res.status(400).json({
      erro: 'Nome e e-mail são obrigatórios'
    });
  }

  try {
    const resultado = db.prepare(`
      INSERT INTO usuarios (nome, email, telefone)
      VALUES (?, ?, ?)
    `).run(nome.trim(), email.trim().toLowerCase(), telefone || null);

    res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso',
      id: resultado.lastInsertRowid
    });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({
        erro: 'Este e-mail já está cadastrado'
      });
    }

    res.status(500).json({
      erro: 'Erro ao cadastrar usuário'
    });
  }
});

// Atualizar usuário
router.put('/:id', (req, res) => {
  const { nome, email, telefone } = req.body;

  if (!nome || !email) {
    return res.status(400).json({
      erro: 'Nome e e-mail são obrigatórios'
    });
  }

  try {
    const resultado = db.prepare(`
      UPDATE usuarios
      SET nome = ?, email = ?, telefone = ?
      WHERE id = ?
    `).run(nome.trim(), email.trim().toLowerCase(), telefone || null, req.params.id);

    if (!resultado.changes) {
      return res.status(404).json({
        erro: 'Usuário não encontrado'
      });
    }

    res.json({ mensagem: 'Usuário atualizado com sucesso' });
  } catch (error) {
    res.status(error.code === 'SQLITE_CONSTRAINT_UNIQUE' ? 409 : 500).json({
      erro: error.code === 'SQLITE_CONSTRAINT_UNIQUE'
        ? 'Este e-mail já está cadastrado'
        : 'Erro ao atualizar usuário'
    });
  }
});

// Excluir usuário
router.delete('/:id', (req, res) => {
  try {
    const resultado = db.prepare(
      'DELETE FROM usuarios WHERE id = ?'
    ).run(req.params.id);

    if (!resultado.changes) {
      return res.status(404).json({
        erro: 'Usuário não encontrado'
      });
    }

    res.json({ mensagem: 'Usuário excluído com sucesso' });
  } catch (error) {
    res.status(409).json({
      erro: 'Não é possível excluir: existem solicitações vinculadas'
    });
  }
});

module.exports = router;
