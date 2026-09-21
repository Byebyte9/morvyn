#!/usr/bin/env bash
/**
 * Morvyn Bot
 * Desenvolvido por Brkn
 * © 2026 - Todos os direitos reservados
*/



while : 

do

clear

GRADIENT=(93 99 105 111 117 81 45 39)
i=0

figlet MORVYN | while IFS= read -r line; do
  color=${GRADIENT[$((i % ${#GRADIENT[@]}))]}
  echo -e "\e[38;5;${color}m${line}\e[0m"
  ((i++))
  
done
licence=$(node -p "require('./src/command/group/licence.json').licence")
echo -e "\e[38;5;99m╔══════════════════════════════════════╗\e[0m"
echo -e "\e[38;5;99m║                                      ║\e[0m"
echo -e "\e[38;5;111m║        🚀 MORVYN BOT ONLINE          ║\e[0m"
echo -e "\e[38;5;63m║                             by: 𝔅𝑟𝑘𝑛 ║\e[0m"
echo -e "\e[38;5;39m╚══════════════════════════════════════╝\e[0m"

echo ""
echo "🕒 Iniciado em: $(date '+%d/%m/%Y %H:%M:%S')"
echo "📦 Versão: $(node -p "require('./package.json').version")"
echo "🟢 Node: $(node -v)"
echo "Prefixo: $(node -p "require('./src/settings/config.json').prefix.value")"
echo ""
echo "Você esta usando Morvyn - ${licence}"
echo ""

  AUTO=$(node -p "require('./src/settings/options.json').autoReconectar")

  if [ "$AUTO" != "true" ]; then
    echo "Auto reconexão desativada"
    echo ""
    
    node start.js --code

    exit 0
  fi
  
  if [ "$AUTO" = "true" ]; then 
    echo -e "\e[38;5;46mMORVYN - Auto reconexão ativada ✔\e[0m"
    echo ""
    
    node start.js --code
    echo ""
    echo "Morvyn reconectando em..."
    echo "5"
    sleep 1
    echo "4"
    sleep 1
    echo "3"
    sleep 1
    echo "2"
    sleep 1
    echo "1"
    sleep 1
  fi

done