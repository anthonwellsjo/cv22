export interface Plate {
  id: number,
  order: number,
}

export const getAnimPlates = (amount: number, StartOrder: number = 0) => {
  const elements = [];
  for (let i = 0; i < amount; i++) {
    const element = { id: Date.now(), order: StartOrder + i };
    elements.push(element);
  }

  return elements;
};