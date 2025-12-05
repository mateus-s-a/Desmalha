export const formatNumber = (num, decimals = 4) => {
    return Number(num).toFixed(decimals);
};

export const generateId = () => {
    return 'id_' + Math.random().toString(36).substr(2, 9);
};

export const loadTemplate = async (path, targetId) => {
    try {
        // In a real server environment, we would fetch. 
        // For static file protocol, this might fail with CORS if not on a server.
        // We will use direct innerHTML injection for this demo or fetch if applicable.
        const response = await fetch(path);
        const html = await response.text();
        document.getElementById(targetId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading template ${path}:`, error);
    }
};
