import { maxScroll, thresHolds } from "./app-config";

export function getScrollPercentage(scroll: number): number {

  return scroll / maxScroll * 100;
}
export function getScrollPosition(position: number): number {

  return (position * 30 / 100);
}

export const scrollCalculator = (deltaY: number, deltaX: number) => {
  if (Math.abs(deltaY) > Math.abs(deltaX)) {
    return deltaY / 1000;
  }
  else {
    return deltaX / 1000;
  }
}

export function isInZone(zone: [number, number], scroll: number): boolean {
  const position = scroll;
  if (position >= zone[0] && position < zone[1]) {
    return true;
  }
  return false;
}

//returns -1 if not inside zone
export function getPercentageOfZone(zone: [number, number], scroll: number): number {
  const total = zone[1] - zone[0];
  const progress = scroll - zone[0];
  if (progress < 0 || progress > total) return -1;
  return progress / total * 100;

}

export function getNewTouchScroll(last: { X: number, Y: number }, next: { X: number, Y: number }): number {
  console.log("next Y", next.Y, "next X", next.X);
  if (Math.abs(last.Y - next.Y) > Math.abs(last.X - next.X)) {
    const Y = (last.Y - next.Y) / 60;
    return Y;
  } else {
    const X = (last.X - next.X) / 60;
    return X
  }

}

export function getClosestThreshold(scroll: number): number | undefined {
  return thresHolds.find(v => Math.abs(scroll - v) < 5)
}