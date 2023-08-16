// Importa o módulo 'fibonacci' para usar a função 'iterate'
const fb = require('fibonacci');

// Importa os módulos relacionados às threads de trabalhador
const {
    Worker, // Classe para criar trabalhadores
    isMainThread, // Verifica se o código está sendo executado na thread principal
    parentPort, // Canal de comunicação com a thread principal
    workerData // Dados passados para a thread de trabalhador
} = require('worker_threads');

// Função que cria uma Promessa para executar a função 'iterate' em um trabalhador
const runFibonacci = workerData => {
    return new Promise((resolve, reject) => {
        // Cria um trabalhador com este mesmo arquivo (__filename) e passa os dados
        const worker = new Worker(__filename, {
            workerData
        });

        // Configura os manipuladores de eventos para o trabalhador
        worker.on('message', resolve); // Resolve a Promessa quando receber uma mensagem
        worker.on('error', reject); // Rejeita a Promessa se ocorrer um erro
        worker.on('exit', code => {
            // Rejeita a Promessa se o trabalhador sair com código diferente de 0
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
};

// Se não estiver na thread principal, executa o cálculo usando 'iterate' e envia o resultado de volta para a thread principal
if (!isMainThread) {
    // Executa a função 'iterate' com o número de iterações fornecido como workerData
    const result = fb.iterate(workerData.iterations);

    // Envia o resultado de volta para a thread principal através do canal parentPort
    parentPort.postMessage(result);
}

// Exporta a função 'runFibonacci' para ser usada em outros módulos
module.exports = runFibonacci;