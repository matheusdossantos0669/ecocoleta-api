
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const db = require('./database/database');

const app = express();

app.use(cors());
app.use(express.json());

// Importação das rotas
const usuariosRoutes = require('./routes/usuarios');
const pontosRoutes = require('./routes/pontos');
const materiaisRoutes = require('./routes/materiais');
const solicitacoesRoutes = require('./routes/solicitacoes');

// Rota inicial
app.get('/', (req, res) => {
  res.json({
    mensagem: 'Bem-vindo à API EcoColeta!',
    versao: '1.0.0',
    status: 'Funcionando'
  });
});

// Rotas da aplicação
app.use('/usuarios', usuariosRoutes);
app.use('/pontos-coleta', pontosRoutes);
app.use('/materiais', materiaisRoutes);
app.use('/solicitacoes', solicitacoesRoutes);

// Documentação será configurada posteriormente

// Tratamento de rotas inexistentes
app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`EcoColeta API rodando na porta ${PORT}`);
});
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));