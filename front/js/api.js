const API_BASE_URL = '/api';

async function fetchMovies(params = {}) {
    const url = new URL(`${API_BASE_URL}/movies`, window.location.origin);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const response = await fetch(url.href);
    if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
    }
    return response.json();
}


async function fetchMovie(id) {
    const response = await fetch(`${API_BASE_URL}/movies/${id}/`);
    if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
    }
    return response.json();
}

async function createMovie(data) {
    console.log(data);
    const response = await fetch(`${API_BASE_URL}/movies`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Ошибка: ${errorData.message}`);
    }
    return response.json();
}

async function updateMovie(id, data) {
    const response = await fetch(`${API_BASE_URL}/movies/${id}/`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Ошибка: ${errorData.message}`);
    }
    return response.json();
}

async function deleteMovie(id) {
    const response = await fetch(`${API_BASE_URL}/movies/${id}/`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Ошибка: ${errorData.message}`);
    }
}

async function fetchOSInfo() {
    const response = await fetch(`${API_BASE_URL}/os-info`);
    if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
    }
    return response.json();
}

async function fetchFileInfo() {
    const response = await fetch(`${API_BASE_URL}/file-info`);
    if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
    }
    return response.text();
}