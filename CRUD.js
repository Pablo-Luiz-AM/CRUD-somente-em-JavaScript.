const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const database = {};

function mostrarMenu() {
  console.log('Escolha uma opção:');
  console.log('1. Criar item');
  console.log('2. Ler todos os itens');
  console.log('3. Atualizar item por ID');
  console.log('4. Excluir item por ID');
  console.log('0. Sair');
}

function criarItem() {
  rl.question('Digite o nome do item: ', (nome) => {
    const id = Object.keys(database).length + 1;
    database[id] = { id, nome };
    console.log(`Item criado: ${JSON.stringify(database[id])}`);
    mostrarMenu();
  });
}

function lerTodosOsItens() {
  console.log('Itens no banco de dados:');
  for (const id in database) {
    console.log(`ID: ${database[id].id}, Nome: ${database[id].nome}`);
  }
  mostrarMenu();
}

function atualizarItem() {
  rl.question('Digite o ID do item a ser atualizado: ', (id) => {
    if (database[id]) {
      rl.question('Digite o novo nome: ', (novoNome) => {
        database[id].nome = novoNome;
        console.log(`Item atualizado: ${JSON.stringify(database[id])}`);
        mostrarMenu();
      });
    } else {
      console.log(`Item com ID ${id} não encontrado`);
      mostrarMenu();
    }
  });
}

function excluirItem() {
  rl.question('Digite o ID do item a ser excluído: ', (id) => {
    if (database[id]) {
      const deletedItem = database[id];
      delete database[id];
      console.log(`Item excluído: ${JSON.stringify(deletedItem)}`);
      mostrarMenu();
    } else {
      console.log(`Item com ID ${id} não encontrado`);
      mostrarMenu();
    }
  });
}

function executarOpcao(opcao) {
  switch (opcao) {
    case '1':
      criarItem();
      break;
    case '2':
      lerTodosOsItens();
      break;
    case '3':
      atualizarItem();
      break;
    case '4':
      excluirItem();
      break;
    case '0':
      rl.close();
      break;
    default:
      console.log('Opção inválida. Tente novamente.');
      mostrarMenu();
      break;
  }
}

function iniciarAplicacao() {
  mostrarMenu();
  rl.on('line', (input) => {
    executarOpcao(input.trim());
  });
}

iniciarAplicacao();