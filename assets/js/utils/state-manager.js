/**
 * StateManager
 * Utilitário para gerenciar persistência de dados no localStorage.
 * Permite salvar e recuperar o estado das calculadoras entre navegações.
 */
export class StateManager {
    /**
     * Salva um objeto de estado
     * @param {string} key - Chave única (ex: 'desmalha_mesh_state')
     * @param {object} state - Dados a serem salvos
     */
    static saveState(key, state) {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem(key, serializedState);
            console.log(`[StateManager] Estado salvo para ${key}`);
        } catch (error) {
            console.error(`[StateManager] Erro ao salvar estado:`, error);
        }
    }

    /**
     * Carrega um objeto de estado
     * @param {string} key - Chave única
     * @returns {object|null} - Dados recuperados ou null se vazio
     */
    static loadState(key) {
        try {
            const serializedState = localStorage.getItem(key);
            if (serializedState === null) {
                return null;
            }
            return JSON.parse(serializedState);
        } catch (error) {
            console.error(`[StateManager] Erro ao carregar estado:`, error);
            return null;
        }
    }

    /**
     * Limpa um estado específico
     * @param {string} key 
     */
    static clearState(key) {
        try {
            localStorage.removeItem(key);
            console.log(`[StateManager] Estado limpo para ${key}`);
        } catch (error) {
            console.error(`[StateManager] Erro ao limpar estado:`, error);
        }
    }
}