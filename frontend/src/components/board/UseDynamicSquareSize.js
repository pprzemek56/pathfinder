import { useState, useEffect } from 'react';

export function UseDynamicSquareSize() {
    const [squareSize, setSquareSize] = useState(24); // Default size

    useEffect(() => {
        const handleResize = () => {
            const container = document.querySelector('.canvas-container');
            if (!container) return;

            const containerWidth = container.offsetWidth;
            const maxWidth = Math.min(containerWidth, window.innerWidth * 0.9); // 90% of the window width
            const size = Math.floor(maxWidth / 53); // Assuming 53 is the number of squares horizontally

            console.log("Calculated square size:", size);
            setSquareSize(Math.min(size, 24)); // Or any maximum size you prefer
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return squareSize;
}