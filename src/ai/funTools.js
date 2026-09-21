const conselhos = [
  "não desista dos seus sonhos, continue dormindo",
  "não deixe pra amanhã se você pode fazer semana que vem",
  "tenha menos amigos, assim terá menos aniversários pra lembrar",
  "se todos os seus planos dão errado, não tenha planos assim nada dá errado",
  "se você não sabe o que está fazendo, faça com confiança",
  "nunca erre sozinho, sempre chame um amigo pra errar junto",
  "se a vida te der limões, peça sal e tequila",
  "não corra atrás dos seus sonhos, eles não vão fugir",
  "não guarde rancor, guarde prints",
  "se você não consegue convencer, confunda",
  "nunca tome decisões importantes de barriga vazia, peça um lanche primeiro",
  "se o problema não tem solução, ele também não precisa da sua preocupação",
  "não faça hoje o que pode ser esquecido até amanhã",
  "trabalhe em equipe: você culpa alguém e alguém culpa você",
  "se você perdeu a oportunidade, provavelmente ela também não era tão boa assim",
  "se estiver em dúvida, durma. amanhã você continuará em dúvida, mas descansado",
  "nunca discuta com um idiota, você pode acabar ficando sem argumentos e sem paciência",
  "se a primeira tentativa não deu certo, parabéns, você já sabe uma forma de fazer errado",
  "não seja tão duro consigo mesmo, deixe isso para os outros",
  "se você não pode ser pontual, seja carismático",
  "não procure problemas, eles sabem onde você mora",
  "se o caminho parece longo, sente um pouco",
  "não tenha medo de falhar, tenha medo de ter que explicar como falhou",
  "se ninguém entende seus planos, talvez seja porque você também não entende",
  "quando a vida fechar uma porta, veja se tem uma janela antes de pagar pela reforma",
  "não faça promessas que dependem da sua memória",
  "se algo é urgente, provavelmente alguém lembrou tarde demais",
  "nunca subestime o poder de fingir que não viu",
  "se você não sabe a resposta, responda com outra pergunta",
  "não confunda estar ocupado com estar fazendo alguma coisa",
  "se a situação está sob controle, provavelmente você não percebeu alguma coisa",
  "sempre tenha um plano B, mas de preferência não tenha um plano A muito trabalhoso",
  "não persiga a perfeição, ela também está tentando fugir de você",
  "se você não pode mudar a situação, mude de assunto",
  "não faça drama por pequenas coisas, guarde energia para as grandes",
  "não tenha pressa para crescer, boleto chega sozinho",
  "se você não sabe o que quer, pelo menos sabe que quer alguma coisa",
  "não se preocupe com o futuro, ele chega sem precisar de convite",
  "se você cometeu um erro, transforme em aprendizado; se cometer de novo, transforme em tradição",
  "não procure sentido em tudo, às vezes a cadeira só está ali",
  "se o silêncio é ouro, falar demais é parcelar a riqueza",
  "acredite em você, principalmente porque ninguém vai acreditar por você",
  "quando tudo parecer perdido, procure melhor; às vezes você só perdeu o celular",
  "se falarem mal de você pelas costas, peide",
  "trabalhar é duro e importante, então deixe pra outra pessoa",
  "se alguém te disser que você não consegue, concorde e economize energia",
  "se o despertador tocar, respeite a mensagem e continue dormindo",
  "se te ignorarem, ignore também; empate é empate",
  "não faça hoje o que você pode esquecer completamente amanhã",
  "se alguém pedir sua opinião, pense duas vezes antes de dar problema",
  "se a preguiça é um pecado, pelo menos peque sentado",
  "se você não tem dinheiro, economize não gastando dinheiro que você não tem",
  "se a vida cobrar resultados, diga que está em manutenção",
  "se alguém estiver falando de você, pelo menos está pensando em você",
  "se te chamarem de inútil, lembre que você pode ser inútil em várias coisas",
  "se você não sabe o que fazer, faça cara de quem sabe",
  "se der vontade de desistir, lembre que você pode desistir amanhã também",
  "se a vida te derrubar, aproveite para tirar uma soneca",
  "não corra atrás de ninguém, você pode cansar",
  "se ninguém percebeu seu erro, tecnicamente foi só um detalhe",
  "se perguntarem por que você está quieto, diga que está economizando palavras",
  "não tenha vergonha de pedir ajuda",
  "se tudo der errado, diga que era um teste",
  "se o plano não funcionou, mude o nome para experiência",
  "se você estiver perdido, caminhe com confiança; talvez pareça que sabe onde está indo",
  "se a cama está confortável, não questione os planos do universo",
  "não complique sua vida, ela já veio com complicações de fábrica",
  "se a segunda-feira fosse boa, teria outro nome",
  "se você não consegue acordar cedo, pelo menos acorde bonito"
];


function sortearSorte(nome = "você") {
  const porcentagem =
    Math.floor(Math.random() * 101);

  let nivel;

  if (porcentagem <= 20) {
    nivel = "🍀 Azarado hoje...";
  } else if (porcentagem <= 50) {
    nivel = "🙂 Sorte normal";
  } else if (porcentagem <= 80) {
    nivel = "✨ Sortudo!";
  } else {
    nivel = "🔥 EXTREMAMENTE SORTUDO!";
  }

  return `🎲 *Sorte de ${nome}*\n\nVocê está com *${porcentagem}%* de sorte hoje!\n${nivel}`;
}


function gerarConselho() {
  const random =
    conselhos[
      Math.floor(Math.random() * conselhos.length)
    ];

  return `🎎 *Conselho de um sábio chinês:*\n\n"${random}"`;
}


function calcularShip(pessoa1, pessoa2) {
  const porcentagem =
    Math.floor(Math.random() * 101);

  return {
    porcentagem,
    texto:
      `💘 Compatibilidade de *${pessoa1}* e *${pessoa2}* é...\n\n*${porcentagem}%* 💕`
  };
}


function criarCarinho(de, para) {
  return `@${de} fez carinho em @${para} 🤩`;
}


module.exports = {
  sortearSorte,
  gerarConselho,
  calcularShip,
  criarCarinho
};