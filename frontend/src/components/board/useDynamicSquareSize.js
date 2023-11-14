import { useState, useEffect } from 'react';

export function useDynamicSquareSize() {
    const [squareSize, setSquareSize] = useState(24); // Default size

    useEffect(() => {
        const handleResize = () => {
            const newSize = Math.min(24, window.innerWidth / 53);
            setSquareSize(newSize);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return squareSize;
}