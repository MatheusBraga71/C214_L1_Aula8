
const { expect } = require('chai');
const { Tarefa, listaTarefas, adicionarTarefa, visualizarLista, atualizarStatus, excluirTarefa } = require('../src/Tarefa');

describe('Testes da Lista de Tarefas', () => {
    beforeEach(function () {
        listaTarefas.length = 0; // Limpando a lista de tarefas antes de cada teste
    });

    it('Testando função de adicionar tarefa à lista', function () {

        adicionarTarefa('Titulo de teste', 'Descrição de teste');
        expect(listaTarefas.length).to.equal(1);

    });


    it('Testando função de visualizar a lista - Lista Vazia', function () {

        const originalConsoleLog = console.log; // Redefinindo a função console.log temporarriamente para capturar a saída
        let consoleOutput = '';
        console.log = function (message) {
            consoleOutput += message + '\n';
        };

        visualizarLista();

        console.log = originalConsoleLog; // Restaurando a função console.log original

        expect(consoleOutput).to.equal('A Lista de Tarefas está vazia!\n');
    });

    it('Testando função de visualizar a lista - Lista com Elementos', function () {

        // Inserindo elementos na lista 
        const tarefa1 = new Tarefa('Tarefa 1', 'Descrição da Tarefa 1');
        const tarefa2 = new Tarefa('Tarefa 2', 'Descrição da Tarefa 2');
        listaTarefas.push(tarefa1);
        listaTarefas.push(tarefa2);

        const originalConsoleLog = console.log; // Redefinindo a função console.log temporarriamente para capturar a saída
        let consoleOutput = '';
        console.log = function (message) {
            consoleOutput += message + '\n';
        };

        visualizarLista();

        console.log = originalConsoleLog; // Restaurando a função console.log original

        // Verifique se a saída esperada foi gerada
        expect(consoleOutput).to.contain('Lista de Tarefas:');
        expect(consoleOutput).to.contain('Titulo: Tarefa 1');
        expect(consoleOutput).to.contain('Descrição: Descrição da Tarefa 1');
        expect(consoleOutput).to.contain('Status: A fazer');
        expect(consoleOutput).to.contain('-------------------------');
        expect(consoleOutput).to.contain('Titulo: Tarefa 2');
        expect(consoleOutput).to.contain('Descrição: Descrição da Tarefa 2');
        expect(consoleOutput).to.contain('Status: A fazer');
        expect(consoleOutput).to.contain('-------------------------');

    });

    it('Testando função de atualizar status de uma tarefa', function () {

        const tarefa1 = new Tarefa('Tarefa 1', 'Descrição da Tarefa 1');
        listaTarefas.push(tarefa1);

        atualizarStatus(0, 'Em andamento');

        expect(listaTarefas[0].status).to.equal('Em andamento');

    });

    it('Testando função de excluir um elemento da lista', function () {

        const tarefa1 = new Tarefa('Tarefa 1', 'Descrição da Tarefa 1');
        const tarefa2 = new Tarefa('Tarefa 2', 'Descrição da Tarefa 2');
        listaTarefas.push(tarefa1);
        listaTarefas.push(tarefa2);

        excluirTarefa(0); // Removendo primeiro elemento

        expect(listaTarefas.length).to.equal(1); // Verifica se removeu
        expect(listaTarefas[0].titulo).to.equal('Tarefa 2'); // Verifica se atualizou os índices

    });

    it('Testando função de excluir elemento da lista - índice fora dos limites', function() {
       
        const tarefa1 = new Tarefa('Tarefa 1', 'Descrição da Tarefa 1');
        const tarefa2 = new Tarefa('Tarefa 2', 'Descrição da Tarefa 2');
        listaTarefas.push(tarefa1);
        listaTarefas.push(tarefa2);

        excluirTarefa(5);

        expect(listaTarefas).to.have.lengthOf(2);
        expect(listaTarefas[0].titulo).to.equal('Tarefa 1');
        expect(listaTarefas[1].titulo).to.equal('Tarefa 2');

    });
    
});