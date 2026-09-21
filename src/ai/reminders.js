const lembretes = new Map();

let proximoId = 1;

function criarLembrete({ sock, jid, minutos, mensagem }) {

  minutos = Number(minutos);

  if (!sock) {
    console.error("❌ criarLembrete recebeu sock undefined.");
    return "Não consegui criar o lembrete porque a conexão do WhatsApp não foi encontrada.";
  }

  if (!jid) {
    console.error("❌ criarLembrete recebeu jid undefined.");
    return "Não consegui criar o lembrete porque o chat não foi identificado.";
  }

  if (!Number.isFinite(minutos) || minutos <= 0) {
    return "O tempo do lembrete precisa ser maior que zero.";
  }

  if (!mensagem || !mensagem.trim()) {
    return "Você precisa informar o que devo lembrar.";
  }

  const id = proximoId++;

  const tempoMs = minutos * 60 * 1000;

  const timeout = setTimeout(async () => {

    try {

      if (!sock) {
        console.error(
          `❌ Lembrete ${id}: socket não existe mais.`
        );

        lembretes.delete(id);

        return;
      }

      await sock.sendMessage(jid, {
        text: `*Wappia:* 🔔 Lembrete:\n${mensagem}`
      });

      lembretes.delete(id);

      console.log(
        `🔔 Lembrete ${id} enviado.`
      );

    } catch (error) {

      console.error(
        `❌ Erro ao enviar lembrete ${id}:`,
        error
      );

    }

  }, tempoMs);

  lembretes.set(id, {
    id,
    jid,
    mensagem,
    minutos,
    timeout,
    criadoEm: Date.now()
  });

  console.log(
    `⏰ Lembrete ${id} criado para daqui ${minutos} minuto(s).`
  );

  return `Lembrete criado com sucesso para daqui ${minutos} minuto(s).`;
}


function listarLembretes(jid) {

  const lista = [];

  for (const lembrete of lembretes.values()) {

    if (lembrete.jid !== jid) {
      continue;
    }

    lista.push({
      id: lembrete.id,
      mensagem: lembrete.mensagem,
      minutos: lembrete.minutos
    });
  }

  return lista;
}


function cancelarLembrete(id, jid) {

  const numeroId = Number(id);

  const lembrete = lembretes.get(numeroId);

  if (!lembrete) {
    return "Esse lembrete não existe ou já foi enviado.";
  }

  if (lembrete.jid !== jid) {
    return "Esse lembrete não pertence a este chat.";
  }

  clearTimeout(lembrete.timeout);

  lembretes.delete(numeroId);

  return `Lembrete ${id} cancelado.`;
}


module.exports = {
  criarLembrete,
  listarLembretes,
  cancelarLembrete
};