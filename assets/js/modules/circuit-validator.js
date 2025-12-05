export class CircuitValidator {
    static validateMeshInput(size, components) {
        if (size < 2) return { valid: false, message: "O circuito deve ter pelo menos 2 malhas." };
        if (components.length === 0) return { valid: false, message: "Adicione componentes ao circuito." };
        return { valid: true };
    }
}
