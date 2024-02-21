const BASE_URL = 'http://localhost:8000';

export const visualize = async (data) => {
    const response = await fetch(`${BASE_URL}/visualize/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

export const visualize_with_debug = async (data) => {
    const response = await fetch(`${BASE_URL}/visualize_with_debug/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}
