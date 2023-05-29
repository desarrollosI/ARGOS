export const getRandomColor = () =>  {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const alpha = 0.5; // Valor fijo para la transparencia
  
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}