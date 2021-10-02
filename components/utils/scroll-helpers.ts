import { maxScroll } from "./app-config";

export const getScrollPercentage: (scroll: number) => number = (scroll) => {

  return scroll / maxScroll * 100;
}
export const getScrollPosition: (position: number) => number = (position) => {

  return (position * 30 / 100);
}

export const scrollCalculator = (deltaY: number, deltaX: number) => {
  if (Math.abs(deltaY) > Math.abs(deltaX)) {
    return deltaY / 500;
  }
  else {
    return deltaX / 500;
  }
}

export const isInZone: (zone: [number, number], scroll: number) => boolean = (zone, scroll) => {
  const position = getScrollPosition(scroll);
  console.log("position", position);
  if (position > zone[0] && position < zone[1]) {
    return true;
  }
  return false

}