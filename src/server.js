
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const db = require('./database/database');

const app = express();

app.use(cors());
app.use(express.json());

// Importação das rotas
const usuariosRoutes = require('./routes/usuarios');
const pontosRoutes = require('./routes/pontos');
const materiaisRoutes = require('./routes/materiais');
const solicitacoesRoutes = require('./routes/solicitacoes');

// Rota principal
app.get('/', (req, res) => {
  res.json({
    mensagem: 'Bem-vindo à API EcoColeta!',
    versao: '1.0.0',
    status: 'Funcionando'
  });
});

// Rotas da API
app.use('/usuarios', usuariosRoutes);
app.use('/pontos-coleta', pontosRoutes);
app.use('/materiais', materiaisRoutes);
app.use('/solicitacoes', solicitacoesRoutes);

// Documentação Swagger
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// Tratamento de rotas inexistentes
app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada'
  });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`EcoColeta API rodando na porta ${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/api-docs/`);
});
