
const express = require('express');
const router = express.Router();
const db = require('../database/database');

// Listar solicitações
router.get('/', (req, res) => {
  const solicitacoes = db.prepare(`
    SELECT
      s.id,
      u.nome AS usuario,
      p.nome AS ponto_coleta,
      m.nome AS material,
      s.quantidade,
      s.status,
      s.criado_em
    FROM solicitacoes s
    JOIN usuarios u ON s.usuario_id = u.id
    JOIN pontos_coleta p ON s.ponto_id = p.id
    JOIN materiais m ON s.material_id = m.id
    ORDER BY s.id DESC
  `).all();

  res.json(solicitacoes);
});

// Criar solicitação
router.post('/', (req, res) => {
  const { usuario_id, ponto_id, material_id, quantidade } = req.body;

  if (!Number.isInteger(usuario_id) ||
      !Number.isInteger(ponto_id) ||
      !Number.isInteger(material_id) ||
      typeof quantidade !== 'number' ||
      !Number.isFinite(quantidade) ||
      quantidade <= 0) {
    return res.status(400).json({
      erro: 'Informe IDs inteiros válidos e uma quantidade maior que zero'
    });
  }

  try {
    const resultado = db.prepare(`
      INSERT INTO solicitacoes
      (usuario_id, ponto_id, material_id, quantidade)
      VALUES (?, ?, ?, ?)
    `).run(usuario_id, ponto_id, material_id, quantidade);

    res.status(201).json({
      mensagem: 'Solicitação criada com sucesso',
      id: resultado.lastInsertRowid,
      status: 'Pendente'
    });
  } catch (error) {
    res.status(400).json({
      erro: 'Usuário, ponto de coleta ou material não encontrado'
    });
  }
});

// Atualizar status
router.patch('/:id', (req, res) => {
  const { status } = req.body;

  const statusPermitidos = [
    'Pendente',
    'Em andamento',
    'Concluída',
    'Cancelada'
  ];

  if (!statusPermitidos.includes(status)) {
    return res.status(400).json({
      erro: 'Status inválido',
      status_permitidos: statusPermitidos
    });
  }

  const resultado = db.prepare(`
    UPDATE solicitacoes
    SET status = ?
    WHERE id = ?
  `).run(status, req.params.id);

  if (!resultado.changes) {
    return res.status(404).json({
      erro: 'Solicitação não encontrada'
    });
  }

  res.json({
    mensagem: 'Status atualizado com sucesso',
    status
  });
});

// Excluir solicitação
router.delete('/:id', (req, res) => {
  const resultado = db.prepare(
    'DELETE FROM solicitacoes WHERE id = ?'
  ).run(req.params.id);

  if (!resultado.changes) {
    return res.status(404).json({
      erro: 'Solicitação não encontrada'
    });
  }

  res.json({
    mensagem: 'Solicitação excluída com sucesso'
  });
});

module.exports = router;
