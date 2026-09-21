function verHora() {
  return new Date().toLocaleTimeString("pt-BR");
}

function verData() {
  return new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

function calcular(expressao) {
  try {
    if (!expressao) {
      return "Nenhuma expressão foi informada.";
    }

    // Permite somente números e operadores matemáticos básicos
    if (!/^[0-9+\-*/().,%\s]+$/.test(expressao)) {
      return "A expressão contém caracteres que não posso calcular.";
    }

    const resultado = Function(
      `"use strict"; return (${expressao})`
    )();

    if (!Number.isFinite(resultado)) {
      return "O resultado não é um número válido.";
    }

    return String(resultado);
  } catch {
    return "Não consegui calcular essa expressão.";
  }
}

function converterUnidade(valor, de, para) {
  const unidades = {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,

    kg: 1,
    g: 0.001,
    mg: 0.000001,

    l: 1,
    ml: 0.001,

    s: 1,
    min: 60,
    h: 3600
  };

  de = de.toLowerCase();
  para = para.toLowerCase();

  if (!(de in unidades) || !(para in unidades)) {
    return "Unidade não suportada.";
  }

  const valorConvertido =
    Number(valor) * unidades[de] / unidades[para];

  return String(valorConvertido);
}

function sortearNumero(min, max) {
  min = Number(min);
  max = Number(max);

  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return "Os valores precisam ser números.";
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  const numero =
    Math.floor(Math.random() * (max - min + 1)) + min;

  return String(numero);
}

function caraOuCoroa() {
  return Math.random() < 0.5 ? "Cara" : "Coroa";
}

function rolarDado(lados = 6) {
  lados = Number(lados);

  if (!Number.isInteger(lados) || lados < 2) {
    return "O dado precisa ter pelo menos 2 lados.";
  }

  const resultado =
    Math.floor(Math.random() * lados) + 1;

  return String(resultado);
}

module.exports = {
  verHora,
  verData,
  calcular,
  converterUnidade,
  sortearNumero,
  caraOuCoroa,
  rolarDado
};