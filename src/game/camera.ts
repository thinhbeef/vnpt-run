export class Camera {
  public x: number = 0;
  public y: number = 0;
  public viewportWidth: number = 960;
  public viewportHeight: number = 540;
  public worldLength: number = 3600;

  constructor(viewportWidth: number = 960, viewportHeight: number = 540) {
    this.viewportWidth = viewportWidth;
    this.viewportHeight = viewportHeight;
  }

  public update(playerX: number, smooth: boolean = true): void {
    // Keep player at ~28% from the left edge of the screen
    const targetX = playerX - this.viewportWidth * 0.28;

    if (smooth) {
      this.x += (targetX - this.x) * 0.12;
    } else {
      this.x = targetX;
    }

    // Clamp camera
    if (this.x < 0) this.x = 0;
    const maxCameraX = Math.max(0, this.worldLength - this.viewportWidth + 200);
    if (this.x > maxCameraX) this.x = maxCameraX;
  }

  public resize(width: number, height: number): void {
    this.viewportWidth = width;
    this.viewportHeight = height;
  }
}
