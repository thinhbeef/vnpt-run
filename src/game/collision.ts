export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Checks AABB collision with custom padding (inner margin for forgiving hits)
 */
export function checkCollision(
  a: Rect,
  b: Rect,
  paddingX: number = 8,
  paddingY: number = 8
): boolean {
  const aLeft = a.x + paddingX;
  const aRight = a.x + a.width - paddingX;
  const aTop = a.y + paddingY;
  const aBottom = a.y + a.height - paddingY;

  const bLeft = b.x + paddingX;
  const bRight = b.x + b.width - paddingX;
  const bTop = b.y + paddingY;
  const bBottom = b.y + b.height - paddingY;

  return (
    aLeft < bRight &&
    aRight > bLeft &&
    aTop < bBottom &&
    aBottom > bTop
  );
}

/**
 * Checks if entity is near a target within a horizontal threshold distance
 */
export function isNear(entityX: number, targetX: number, threshold: number = 60): boolean {
  return Math.abs(entityX - targetX) <= threshold;
}
