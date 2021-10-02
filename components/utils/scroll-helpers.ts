import { maxScroll } from "./app-config";

export function getScrollPercentage(scroll: number): number {

  return scroll / maxScroll * 100;
}
export function getScrollPosition(position: number): number {

  return (position * 30 / 100);
}

export function scrollCalculator(deltaY: number, deltaX: number): number {
  if (Math.abs(deltaY) > Math.abs(deltaX)) {
    return deltaY / 500;
  }
  else {
    return deltaX / 500;
  }
}

export function isInZone(zone: [number, number], scroll: number): boolean {
  const position = getScrollPosition(scroll);
  console.log("position", position);
  if (position > zone[0] && position < zone[1]) {
    return true;
  }
  return false

}

export function getNewTouchScroll(last: { X: number, Y: number }, next: { X: number, Y: number }): boolean {
  const position = getScrollPosition(scroll);
  console.log("position", position);
 
  return false

}