import { maxScroll, thresHolds } from "./app-config";

export function getScrollPercentage(scroll: number): number {

  return scroll / maxScroll * 100;
}
export function getScrollPosition(position: number): number {

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

export function isInZone(zone: [number, number], scroll: number): boolean {
  const position = scroll;
  console.log("position", position);
  if (position >= zone[0] && position < zone[1]) {
    return true;
  }
  return false

}

export function getNewTouchScroll(last: { X: number, Y: number }, next: { X: number, Y: number }): boolean {

  console.log("last", last, "next", next);

  return false

}

export function getClosestThreshold(scroll: number): number | undefined {
  console.log(scroll);
  return thresHolds.find(v => Math.abs(scroll - v) < 5)
}