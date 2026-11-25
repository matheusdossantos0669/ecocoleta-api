
const swaggerJsDoc = require('swagger-jsdoc');

// Gera a documentação dos campos de identificação
const parametroId = {
  name: 'id',
  in: 'path',
  required: true,
  description: 'ID do registro',
  schema: {
    type: 'integer',
    minimum: 1
  },
  example: 1
};

// Gera os corpos das requisições
const corpo = (schema) => ({
  required: true,
  content: {
    'application/json': {
      schema: {
        $ref: `#/components/schemas/${schema}`
      }
    }
  }
});

// Gera as respostas HTTP
const respostas = (...codigos) => {
  const descricoes = {
    200: 'Operação realizada com sucesso',
    201: 'Registro criado com sucesso',
    400: 'Dados inválidos ou campos obrigatórios ausentes',
    404: 'Registro não encontrado',
    409: 'Conflito de informações ou registro vinculado',
    500: 'Erro interno do servidor'
  };

  return Object.fromEntries(
    codigos.map(codigo => [
      codigo,
      { description: descricoes[codigo] }
    ])
  );
};

const options = {
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'EcoColeta API',
      version: '1.0.0',
      description: `
API REST para gerenciamento de reciclagem e coleta seletiva.

## ODS 11 - Cidades e Comunidades Sustentáveis

O EcoColeta tem como objetivo facilitar o acesso
a pontos de coleta, organizar materiais recicláveis
e gerenciar solicitações de coleta.

Projeto acadêmico de desenvolvimento Back-end.

**Tecnologias:** Node.js, Express e SQLite.
      `
    },

    servers: [
      {
        url: '/',
        description: 'Servidor atual'
      }
    ],

    tags: [
      {
        name: 'Principal',
        description: 'Informações da API'
      },
      {
        name: 'Usuários',
        description: 'Gerenciamento de usuários'
      },
      {
        name: 'Pontos de coleta',
        description: 'Gerenciamento de pontos de coleta'
      },
      {
        name: 'Materiais',
        description: 'Gerenciamento de materiais recicláveis'
      },
      {
        name: 'Solicitações',
        description: 'Gerenciamento de solicitações de coleta'
      }
    ],

    components: {
      schemas: {

        Usuario: {
          type: 'object',
          required: ['nome', 'email'],
          properties: {
            nome: {
              type: 'string',
              example: 'João Silva'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'joao@example.com'
            },
            telefone: {
              type: 'string',
              example: '66900000000'
            }
          }
        },

        PontoColeta: {
          type: 'object',
          required: ['nome', 'endereco', 'cidade'],
          properties: {
            nome: {
              type: 'string',
              example: 'EcoPonto Central'
            },
            endereco: {
              type: 'string',
              example: 'Rua Principal, 100'
            },
            cidade: {
              type: 'string',
              example: 'Rondonópolis'
            },
            responsavel: {
              type: 'string',
              example: 'Carlos Silva'
            }
          }
        },

        Material: {
          type: 'object',
          required: ['nome'],
          properties: {
            nome: {
              type: 'string',
              example: 'Plástico'
            },
            descricao: {
              type: 'string',
              example: 'Garrafas e embalagens plásticas'
            }
          }
        },

        Solicitacao: {
          type: 'object',
          required: [
            'usuario_id',
            'ponto_id',
            'material_id',
            'quantidade'
          ],
          properties: {
            usuario_id: {
              type: 'integer',
              minimum: 1,
              example: 1
            },
            ponto_id: {
              type: 'integer',
              minimum: 1,
              example: 1
            },
            material_id: {
              type: 'integer',
              minimum: 1,
              example: 1
            },
            quantidade: {
              type: 'number',
              minimum: 0,
              exclusiveMinimum: true,
              example: 5
            }
          }
        },

        StatusSolicitacao: {
          type: 'object',
          required: ['status'],
          properties: {
            status: {
              type: 'string',
              enum: [
                'Pendente',
                'Em andamento',
                'Concluída',
                'Cancelada'
              ],
              example: 'Concluída'
            }
          }
        }
      }
    },

    paths: {

      // =====================================
      // ROTA PRINCIPAL
      // =====================================

      '/': {
        get: {
          tags: ['Principal'],
          summary: 'Verificar funcionamento da API',
          description: 'Retorna informações sobre o servidor.',
          responses: respostas(200)
        }
      },

      // =====================================
      // USUÁRIOS
      // =====================================

      '/usuarios': {

        get: {
          tags: ['Usuários'],
          summary: 'Listar todos os usuários',
          responses: respostas(200, 500)
        },

        post: {
          tags: ['Usuários'],
          summary: 'Cadastrar um novo usuário',
          description: 'O nome e o e-mail são obrigatórios.',
          requestBody: corpo('Usuario'),
          responses: respostas(201, 400, 409, 500)
        }
      },

      '/usuarios/{id}': {

        get: {
          tags: ['Usuários'],
          summary: 'Buscar usuário por ID',
          parameters: [parametroId],
          responses: respostas(200, 404, 500)
        },

        put: {
          tags: ['Usuários'],
          summary: 'Atualizar um usuário',
          parameters: [parametroId],
          requestBody: corpo('Usuario'),
          responses: respostas(200, 400, 404, 409, 500)
        },

        delete: {
          tags: ['Usuários'],
          summary: 'Excluir um usuário',
          description: 'Usuários com solicitações vinculadas não podem ser excluídos.',
          parameters: [parametroId],
          responses: respostas(200, 404, 409)
        }
      },

      // =====================================
      // PONTOS DE COLETA
      // =====================================

      '/pontos-coleta': {

        get: {
          tags: ['Pontos de coleta'],
          summary: 'Listar todos os pontos de coleta',
          responses: respostas(200, 500)
        },

        post: {
          tags: ['Pontos de coleta'],
          summary: 'Cadastrar um ponto de coleta',
          requestBody: corpo('PontoColeta'),
          responses: respostas(201, 400, 500)
        }
      },

      '/pontos-coleta/{id}': {

        get: {
          tags: ['Pontos de coleta'],
          summary: 'Buscar ponto de coleta por ID',
          parameters: [parametroId],
          responses: respostas(200, 404, 500)
        },

        put: {
          tags: ['Pontos de coleta'],
          summary: 'Atualizar um ponto de coleta',
          parameters: [parametroId],
          requestBody: corpo('PontoColeta'),
          responses: respostas(200, 400, 404, 500)
        },

        delete: {
          tags: ['Pontos de coleta'],
          summary: 'Excluir um ponto de coleta',
          description: 'Pontos com solicitações vinculadas não podem ser excluídos.',
          parameters: [parametroId],
          responses: respostas(200, 404, 409)
        }
      },

      // =====================================
      // MATERIAIS RECICLÁVEIS
      // =====================================

      '/materiais': {

        get: {
          tags: ['Materiais'],
          summary: 'Listar materiais recicláveis',
          responses: respostas(200, 500)
        },

        post: {
          tags: ['Materiais'],
          summary: 'Cadastrar um material reciclável',
          requestBody: corpo('Material'),
          responses: respostas(201, 400, 409, 500)
        }
      },

      '/materiais/{id}': {

        put: {
          tags: ['Materiais'],
          summary: 'Atualizar um material reciclável',
          parameters: [parametroId],
          requestBody: corpo('Material'),
          responses: respostas(200, 400, 404, 409, 500)
        },

        delete: {
          tags: ['Materiais'],
          summary: 'Excluir um material reciclável',
          description: 'Materiais com solicitações vinculadas não podem ser excluídos.',
          parameters: [parametroId],
          responses: respostas(200, 404, 409)
        }
      },

      // =====================================
      // SOLICITAÇÕES DE COLETA
      // =====================================

      '/solicitacoes': {

        get: {
          tags: ['Solicitações'],
          summary: 'Listar todas as solicitações',
          description: 'Retorna as solicitações com informações do usuário, ponto de coleta e material.',
          responses: respostas(200, 500)
        },

        post: {
          tags: ['Solicitações'],
          summary: 'Criar uma solicitação de coleta',
          description: 'Os IDs devem corresponder a registros existentes e a quantidade deve ser maior que zero.',
          requestBody: corpo('Solicitacao'),
          responses: respostas(201, 400)
        }
      },

      '/solicitacoes/{id}': {

        patch: {
          tags: ['Solicitações'],
          summary: 'Atualizar status da solicitação',
          parameters: [parametroId],
          requestBody: corpo('StatusSolicitacao'),
          responses: respostas(200, 400, 404, 500)
        },

        delete: {
          tags: ['Solicitações'],
          summary: 'Excluir uma solicitação',
          parameters: [parametroId],
          responses: respostas(200, 404, 500)
        }
      }
    }
  },

  apis: []
};

module.exports = swaggerJsDoc(options);
