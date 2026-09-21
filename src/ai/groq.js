const dotenv = require("dotenv");
dotenv.config();

const Groq = require("groq-sdk");

const {
  verHora,
  verData,
  calcular,
  converterUnidade,
  sortearNumero,
  caraOuCoroa,
  rolarDado
} = require("./tools");

const {
  criarLembrete,
  listarLembretes,
  cancelarLembrete
} = require("./reminders");

const {
  sortearSorte,
  gerarConselho,
  calcularShip,
  criarCarinho
} = require("./funTools")

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const MODEL = "openai/gpt-oss-120b";

/*
 * =========================================================
 * FERRAMENTAS
 * =========================================================
 *
 * Essas ferramentas são executadas pelo nosso próprio
 * Node.js quando a Wappia decidir utilizá-las.
 */

const localTools = [
  {
    type: "function",
    function: {
      name: "ver_hora",
      description: "Retorna a hora atual.",
      parameters: {
        type: "object",
        properties: {},
        required: []
      }
    }
  },

  {
    type: "function",
    function: {
      name: "ver_data",
      description: "Retorna a data atual.",
      parameters: {
        type: "object",
        properties: {},
        required: []
      }
    }
  },

  {
    type: "function",
    function: {
      name: "calcular",
      description: "Realiza cálculos matemáticos.",
      parameters: {
        type: "object",
        properties: {
          expressao: {
            type: "string",
            description:
              "Expressão matemática. Exemplo: 25 * 8 + 10"
          }
        },
        required: ["expressao"]
      }
    }
  },

  {
    type: "function",
    function: {
      name: "converter_unidade",
      description:
        "Converte valores entre unidades de medida.",
      parameters: {
        type: "object",
        properties: {
          valor: {
            type: "number",
            description: "Valor a ser convertido."
          },

          de: {
            type: "string",
            description:
              "Unidade de origem, como km, m, kg, g, l, ml, h, min ou s."
          },

          para: {
            type: "string",
            description:
              "Unidade de destino."
          }
        },
        required: ["valor", "de", "para"]
      }
    }
  },

  {
    type: "function",
    function: {
      name: "sortear_numero",
      description:
        "Sorteia um número inteiro dentro de um intervalo.",
      parameters: {
        type: "object",
        properties: {
          min: {
            type: "number",
            description: "Valor mínimo."
          },

          max: {
            type: "number",
            description: "Valor máximo."
          }
        },
        required: ["min", "max"]
      }
    }
  },

  {
    type: "function",
    function: {
      name: "cara_ou_coroa",
      description:
        "Joga uma moeda e retorna Cara ou Coroa.",
      parameters: {
        type: "object",
        properties: {},
        required: []
      }
    }
  },

  {
    type: "function",
    function: {
      name: "rolar_dado",
      description:
        "Rola um dado com a quantidade de lados especificada.",
      parameters: {
        type: "object",
        properties: {
          lados: {
            type: "number",
            description:
              "Quantidade de lados do dado. Padrão: 6."
          }
        },
        required: []
      }
    }
  },

  {
    type: "function",
    function: {
      name: "criar_lembrete",
      description:
        "Cria um lembrete que será enviado posteriormente no mesmo chat.",
      parameters: {
        type: "object",
        properties: {
          minutos: {
            type: "number",
            description:
              "Quantidade de minutos até o lembrete. Exemplo: 10 para daqui 10 minutos."
          },

          mensagem: {
            type: "string",
            description:
              "Mensagem que deverá ser enviada quando o lembrete disparar."
          }
        },
        required: ["minutos", "mensagem"]
      }
    }
  },

  {
    type: "function",
    function: {
      name: "listar_lembretes",
      description:
        "Lista os lembretes ativos do chat atual.",
      parameters: {
        type: "object",
        properties: {},
        required: []
      }
    }
  },

  {
    type: "function",
    function: {
      name: "cancelar_lembrete",
      description:
        "Cancela um lembrete ativo pelo ID.",
      parameters: {
        type: "object",
        properties: {
          id: {
            type: "number",
            description:
              "ID do lembrete que será cancelado."
          }
        },
        required: ["id"]
      }
    }
  },
  {
  type: "function",
  function: {
    name: "ship",
    description:
      "Calcula uma porcentagem aleatória de compatibilidade entre duas pessoas.",
    parameters: {
      type: "object",
      properties: {
        pessoa1: {
          type: "string",
          description: "Nome da primeira pessoa."
        },
        pessoa2: {
          type: "string",
          description: "Nome da segunda pessoa."
        }
      },
      required: ["pessoa1", "pessoa2"]
    }
  }
},

{
  type: "function",
  function: {
    name: "carinho",
    description:
      "Faz uma mensagem divertida de carinho entre duas pessoas.",
    parameters: {
      type: "object",
      properties: {
        de: {
          type: "string",
          description: "Nome de quem fará carinho."
        },
        para: {
          type: "string",
          description: "Nome de quem receberá carinho."
        }
      },
      required: ["de", "para"]
    }
  }
},

{
  type: "function",
  function: {
    name: "sorte",
    description:
      "Calcula aleatoriamente a sorte de uma pessoa.",
    parameters: {
      type: "object",
      properties: {
        nome: {
          type: "string",
          description: "Nome da pessoa."
        }
      },
      required: []
    }
  }
},

{
  type: "function",
  function: {
    name: "conselho",
    description:
      "Gera um conselho divertido e aleatório.",
    parameters: {
      type: "object",
      properties: {},
      required: []
    }
  }
},

{
  type: "function",
  function: {
    name: "consultar_comandos",
    description:
      "Consulta somente os comandos reais carregados pelo bot. Não lista ferramentas internas da Wappia.",
    parameters: {
      type: "object",
      properties: {
        categoria: {
          type: ["string", "null"],
          enum: ["user", "admin", "owner"],
          description:
            "Categoria opcional. Use null quando o usuário não especificar uma categoria."
        }
      },
      required: ["categoria"]
    }
  }
}
];


/*
 * =========================================================
 * EXECUTAR FERRAMENTA
 * =========================================================
 */

async function executarFerramenta(
  nome,
  argumentos = {},
  contexto = {}
) {
  try {

    switch (nome) {

      case "ver_hora":
        return verHora();


      case "ver_data":
        return verData();


      case "calcular":
        return calcular(
          argumentos.expressao
        );


      case "converter_unidade":
        return converterUnidade(
          argumentos.valor,
          argumentos.de,
          argumentos.para
        );


      case "sortear_numero":
        return sortearNumero(
          argumentos.min,
          argumentos.max
        );


      case "cara_ou_coroa":
        return caraOuCoroa();


      case "rolar_dado":
        return rolarDado(
          argumentos.lados || 6
        );


      case "criar_lembrete":

        return criarLembrete({
          sock: contexto.sock,
          jid: contexto.jid,
          minutos: argumentos.minutos,
          mensagem: argumentos.mensagem
        });


      case "listar_lembretes":

        return JSON.stringify(
          listarLembretes(
            contexto.jid
          )
        );


      case "cancelar_lembrete":

        return cancelarLembrete(
          argumentos.id,
          contexto.jid
        );

      case "ship": {

  const resultado = calcularShip(
    argumentos.pessoa1,
    argumentos.pessoa2
  );

  return resultado.texto;
}


case "carinho": {

  return criarCarinho(
    argumentos.de,
    argumentos.para
  );
}


case "sorte": {

  return sortearSorte(
    argumentos.nome || "você"
  );
}


case "conselho": {

  return gerarConselho();
}


case "consultar_comandos": {

  const { commands } = require("../core/commandHandler");

  const categoria =
    argumentos?.categoria === null ||
    argumentos?.categoria === undefined ||
    argumentos?.categoria === ""
      ? null
      : String(argumentos.categoria).toLowerCase();

  const g = contexto?.g;
  const sock = contexto?.sock;
  const jid = contexto?.jid;

  let podeAdmin = false;
  let podeOwner = false;

  if (g) {

    podeOwner = !!g.isOwner;

    if (g.isGroup && sock && jid) {
      podeAdmin = await g.isAdmin(sock, jid);
    }

    if (podeOwner) {
      podeAdmin = true;
    }
  }

  const comandos = new Map();

  /*
   * commands contém os comandos reais carregados
   * pelo commandHandler.
   *
   * As tools da Wappia não estão aqui.
   */

  for (const cmd of commands.values()) {

    if (!cmd?.name) continue;

    if (cmd.hidden) continue;

    /*
     * Evita duplicação causada pelos aliases.
     */

    if (comandos.has(cmd.name)) {
      continue;
    }

    /*
     * Se o usuário pediu uma categoria específica.
     */

    if (categoria && cmd.type !== categoria) {
      continue;
    }

    /*
     * Comandos de owner:
     * somente o dono pode visualizar.
     */

    if (cmd.type === "owner" && !podeOwner) {
      continue;
    }

    /*
     * Comandos administrativos:
     * somente admin ou dono.
     */

    if (cmd.type === "admin" && !podeAdmin) {
      continue;
    }

    comandos.set(cmd.name, cmd);
  }

  /*
   * Nenhum comando encontrado.
   */

  if (!comandos.size) {

    if (categoria) {
      return `Não encontrei comandos disponíveis na categoria "${categoria}".`;
    }

    return "Não encontrei comandos disponíveis.";
  }

  /*
   * Monta a lista.
   */

  const lista = [...comandos.values()]
    .map(cmd => `• ${cmd.usage || cmd.name}`)
    .join("\n");

  return (
    `📚 *Comandos disponíveis:*\n\n` +
    `${lista}\n\n` +
    `Total: *${comandos.size}*`
  );
}


      default:

        return `Ferramenta "${nome}" não encontrada.`;
    }

  } catch (error) {

    console.error(
      `❌ Erro ao executar ferramenta ${nome}:`,
      error
    );

    return "Não foi possível executar essa ferramenta.";
  }
}


/*
 * =========================================================
 * PERGUNTAR AO GROQ
 * =========================================================
 */

async function perguntarAoGroq(
  texto,
  contexto = null,
  contextoExecucao = {}
) {

  try {

    
const systemPrompt = `
Você é a Wappia, uma assistente de WhatsApp.

Fale em português do Brasil, de forma natural e descontraída.

Não seja formal demais.
Não fique tentando agradar o usuário o tempo todo.
Não use frases artificiais como "Claro! Estou aqui para ajudar!".
Não fique repetindo o que o usuário acabou de falar.
Não force piadas, memes ou emojis. Use quando fizer sentido.
Pode zoar, brincar, usar ironia e palavrões quando o contexto permitir.
Pode falar "porra", "caralho", "merda", "puta que pariu", "burro" etc. de forma natural em conversas informais.
Não transforme toda resposta em piada.
Se o assunto for sério, responda de forma séria.
Se não souber algo, diga que não sabe. Não invente.
Se o usuário estiver errado, corrija normalmente.

Use as ferramentas disponíveis quando forem necessárias.
Use pesquisa na internet para informações atuais ou que possam ter mudado.
Não invente resultados de pesquisa.

Comandos disponíveis através da ferramenta consultar_comandos:
ela consulta os comandos reais carregados pelo bot. Não invente comandos.

Formato:
- Responda de forma adequada para WhatsApp.
- Pode usar *negrito* e _itálico_.
- Não use Markdown com #.
- Não exagere nos emojis.

Sempre comece a resposta com:

*Wappia:*
`.trim();

    
/*  
 * =====================================================  
 * MENSAGEM DO USUÁRIO  
 * =====================================================  
 */  

const mensagemUsuario = contexto  

  ? `

Mensagem anterior da Wappia:
${contexto}

Mensagem do usuário:
${texto}

Responda considerando o contexto da mensagem anterior.
`.trim()

: texto;  


/*  
 * =====================================================  
 * MENSAGENS  
 * =====================================================  
 */  

    const messages = [
      {
        role: "system",
        content: systemPrompt
      },

      {
        role: "user",
        content: mensagemUsuario
      }
    ];


    /*
     * =====================================================
     * FERRAMENTAS DISPONÍVEIS
     * =====================================================
     *
     * localTools:
     * executadas pelo nosso Node.js.
     *
     * browser_search:
     * executada pelo próprio Groq.
     */

    const tools = [
      ...localTools,

      {
        type: "browser_search"
      }
    ];


    /*
     * =====================================================
     * PRIMEIRA CHAMADA
     * =====================================================
     */

    let completion =
      await groq.chat.completions.create({

        model: MODEL,

        messages,

        tools,

        tool_choice: "auto",

        include_reasoning: false,

        reasoning_effort: "low"
      });


    let resposta =
      completion.choices?.[0]?.message;


    if (!resposta) {
      return null;
    }


    /*
     * =====================================================
     * FERRAMENTAS LOCAIS
     * =====================================================
     */

    if (resposta.tool_calls?.length) {

      /*
       * Adiciona a resposta do modelo
       * ao histórico da conversa.
       */

      messages.push(resposta);


      /*
       * Executa cada ferramenta solicitada.
       */

      for (const toolCall of resposta.tool_calls) {

        const nome =
          toolCall.function?.name;

        let argumentos = {};


        /*
         * Tenta interpretar os argumentos
         * enviados pelo modelo.
         */

        try {

          argumentos = JSON.parse(
            toolCall.function?.arguments || "{}"
          );

        } catch (error) {

          console.error(
            "❌ Erro ao interpretar argumentos:",
            error
          );

        }


        console.log(
          `🔧 Wappia usando ferramenta: ${nome}`,
          argumentos
        );


        /*
         * Executa a ferramenta.
         */

        const resultado =
          await executarFerramenta(
            nome,
            argumentos,
            contextoExecucao
          );


        /*
         * Envia o resultado da ferramenta
         * de volta para o modelo.
         */

        messages.push({

          role: "tool",

          tool_call_id:
            toolCall.id,

          content:
            String(resultado)
        });

      }


      /*
       * ===================================================
       * SEGUNDA CHAMADA
       * ===================================================
       *
       * Agora o Groq recebe os resultados das ferramentas
       * e monta a resposta final para o usuário.
       */

      completion =
        await groq.chat.completions.create({

          model: MODEL,

          messages,

          tools,

          tool_choice: "auto",

          include_reasoning: false,

          reasoning_effort: "medium"
        });


      resposta =
        completion.choices?.[0]?.message;
    }


    /*
     * =====================================================
     * RESPOSTA FINAL
     * =====================================================
     */

    return resposta?.content || null;


  } catch (error) {

  console.error(
    "❌ Erro no Groq:",
    error
  );

  if (error?.status === 429) {

    const retryAfter =
      error?.headers?.get?.("retry-after");

    const segundos = Number(retryAfter);

    if (Number.isFinite(segundos) && segundos > 0) {

      const minutos = Math.ceil(segundos / 60);

      return `*Wappia:*\n⏳ A IA atingiu o limite de uso do Groq no momento. Tente novamente em aproximadamente ${minutos} minuto(s).`;
    }

    return `*Wappia:*\n⏳ A IA atingiu o limite de uso do Groq no momento. Tente novamente daqui a pouco.`;
  }

  return null;
}
}


/*
 * =========================================================
 * EXPORT
 * =========================================================
 */

module.exports = {
  perguntarAoGroq
};