
const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(
  path.join(__dirname, 'ecocoleta.db')
);

db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    telefone TEXT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS pontos_coleta (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    endereco TEXT NOT NULL,
    cidade TEXT NOT NULL,
    responsavel TEXT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS materiais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE,
    descricao TEXT
  );

  CREATE TABLE IF NOT EXISTS solicitacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    ponto_id INTEGER NOT NULL,
    material_id INTEGER NOT NULL,
    quantidade REAL NOT NULL,
    status TEXT DEFAULT 'Pendente',
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (ponto_id) REFERENCES pontos_coleta(id),
    FOREIGN KEY (material_id) REFERENCES materiais(id)
  );
`);

module.exports = db;
