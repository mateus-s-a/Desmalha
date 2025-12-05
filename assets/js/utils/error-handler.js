export class ErrorHandler {
    static handle(error, context) {
        console.error(`Error in ${context}:`, error);
        alert(`Ocorreu um erro: ${error.message}`);
    }
}
