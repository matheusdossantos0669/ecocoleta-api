
const express = require('express');
const router = express.Router();
const db = require('../database/database');

// Listar pontos de coleta
router.get('/', (req, res) => {
  const pontos = db.prepare(
    'SELECT * FROM pontos_coleta ORDER BY id DESC'
  ).all();

  res.json(pontos);
});

// Buscar ponto por ID
router.get('/:id', (req, res) => {
  const ponto = db.prepare(
    'SELECT * FROM pontos_coleta WHERE id = ?'
  ).get(req.params.id);

  if (!ponto) {
    return res.status(404).json({
      erro: 'Ponto de coleta não encontrado'
    });
  }

  res.json(ponto);
});

// Cadastrar ponto
router.post('/', (req, res) => {
  const { nome, endereco, cidade, responsavel } = req.body;

  if (!nome || !endereco || !cidade) {
    return res.status(400).json({
      erro: 'Nome, endereço e cidade são obrigatórios'
    });
  }

  const resultado = db.prepare(`
    INSERT INTO pontos_coleta
    (nome, endereco, cidade, responsavel)
    VALUES (?, ?, ?, ?)
  `).run(nome.trim(), endereco.trim(), cidade.trim(), responsavel || null);

  res.status(201).json({
    mensagem: 'Ponto cadastrado com sucesso',
    id: resultado.lastInsertRowid
  });
});

// Atualizar ponto
router.put('/:id', (req, res) => {
  const { nome, endereco, cidade, responsavel } = req.body;

  if (!nome || !endereco || !cidade) {
    return res.status(400).json({
      erro: 'Nome, endereço e cidade são obrigatórios'
    });
  }

  const resultado = db.prepare(`
    UPDATE pontos_coleta
    SET nome = ?, endereco = ?, cidade = ?, responsavel = ?
    WHERE id = ?
  `).run(nome.trim(), endereco.trim(), cidade.trim(), responsavel || null, req.params.id);

  if (!resultado.changes) {
    return res.status(404).json({
      erro: 'Ponto não encontrado'
    });
  }

  res.json({ mensagem: 'Ponto atualizado com sucesso' });
});

// Excluir ponto
router.delete('/:id', (req, res) => {
  try {
    const resultado = db.prepare(
      'DELETE FROM pontos_coleta WHERE id = ?'
    ).run(req.params.id);

    if (!resultado.changes) {
      return res.status(404).json({
        erro: 'Ponto não encontrado'
      });
    }

    res.json({ mensagem: 'Ponto excluído com sucesso' });
  } catch (error) {
    res.status(409).json({
      erro: 'Não é possível excluir: existem solicitações vinculadas'
    });
  }
});

module.exports = router;
