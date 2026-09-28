import { ObstacleData } from '../types';

export class Obstacle implements ObstacleData {
  public id: string;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public type: 'box' | 'cone' | 'barrier' | 'pothole' | 'sign';
  public name: string;
  public passed: boolean = false;

  constructor(data: ObstacleData, groundY: number) {
    this.id = data.id;
    this.x = data.x;
    this.type = data.type;
    this.name = data.name;

    // Dimensions based on type
    switch (data.type) {
      case 'cone':
        this.width = 34;
        this.height = 42;
        this.y = groundY - this.height;
        break;
      case 'box':
        this.width = 42;
        this.height = 42;
        this.y = groundY - this.height;
        break;
      case 'barrier':
        this.width = 62;
        this.height = 48;
        this.y = groundY - this.height;
        break;
      case 'pothole':
        this.width = 68;
        this.height = 14;
        this.y = groundY - 6; // slightly sunken
        break;
      case 'sign':
        this.width = 38;
        this.height = 68;
        this.y = groundY - this.height;
        break;
      default:
        this.width = 40;
        this.height = 40;
        this.y = groundY - this.height;
    }
  }

  public render(ctx: CanvasRenderingContext2D, cameraX: number): void {
    const screenX = this.x - cameraX;
    const screenY = this.y;

    ctx.save();
    ctx.translate(screenX, screenY);

    switch (this.type) {
      case 'cone':
        this.renderCone(ctx);
        break;
      case 'box':
        this.renderBox(ctx);
        break;
      case 'barrier':
        this.renderBarrier(ctx);
        break;
      case 'pothole':
        this.renderPothole(ctx);
        break;
      case 'sign':
        this.renderSign(ctx);
        break;
    }

    ctx.restore();
  }

  private renderCone(ctx: CanvasRenderingContext2D): void {
    // Traffic Cone
    // Base
    ctx.fillStyle = '#ea580c';
    ctx.beginPath();
    ctx.roundRect(0, this.height - 8, this.width, 8, 2);
    ctx.fill();

    // Cone body
    ctx.beginPath();
    ctx.moveTo(this.width / 2 - 4, 0);
    ctx.lineTo(this.width / 2 + 4, 0);
    ctx.lineTo(this.width - 4, this.height - 8);
    ctx.lineTo(4, this.height - 8);
    ctx.closePath();
    ctx.fill();

    // White reflective stripes
    ctx.fillStyle = '#ffffff';
    // Stripe 1
    ctx.beginPath();
    ctx.moveTo(this.width / 2 - 7, 12);
    ctx.lineTo(this.width / 2 + 7, 12);
    ctx.lineTo(this.width / 2 + 10, 20);
    ctx.lineTo(this.width / 2 - 10, 20);
    ctx.closePath();
    ctx.fill();

    // Stripe 2
    ctx.beginPath();
    ctx.moveTo(this.width / 2 - 11, 26);
    ctx.lineTo(this.width / 2 + 11, 26);
    ctx.lineTo(this.width / 2 + 14, 32);
    ctx.lineTo(this.width / 2 - 14, 32);
    ctx.closePath();
    ctx.fill();
  }

  private renderBox(ctx: CanvasRenderingContext2D): void {
    // Delivery / Telecom crate
    ctx.fillStyle = '#d97706'; // Cardboard brown
    ctx.beginPath();
    ctx.roundRect(0, 0, this.width, this.height, 4);
    ctx.fill();

    // Border
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Packaging tape
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(this.width / 2 - 5, 0, 10, this.height);

    // VNPT optical cable crate icon
    ctx.fillStyle = '#0066cc';
    ctx.font = 'bold 10px monospace';
    ctx.fillText('VNPT', 8, this.height - 10);
  }

  private renderBarrier(ctx: CanvasRenderingContext2D): void {
    // Construction barrier
    // Legs
    ctx.fillStyle = '#475569';
    ctx.fillRect(6, this.height - 18, 6, 18);
    ctx.fillRect(this.width - 12, this.height - 18, 6, 18);

    // Crossboard
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(0, 4, this.width, 24);

    // Diagonal stripes (white)
    ctx.fillStyle = '#ffffff';
    for (let i = -10; i < this.width + 10; i += 18) {
      ctx.beginPath();
      ctx.moveTo(i, 28);
      ctx.lineTo(i + 10, 4);
      ctx.lineTo(i + 16, 4);
      ctx.lineTo(i + 6, 28);
      ctx.closePath();
      ctx.fill();
    }

    // Flashing yellow warning light on top
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(this.width / 2, 0, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  private renderPothole(ctx: CanvasRenderingContext2D): void {
    // Optical cable trench / open roadwork
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.ellipse(this.width / 2, 7, this.width / 2, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Warning marker border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Cable inside
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(6, 7);
    ctx.bezierCurveTo(20, 12, 40, 3, this.width - 6, 7);
    ctx.stroke();
  }

  private renderSign(ctx: CanvasRenderingContext2D): void {
    // Pole
    ctx.fillStyle = '#64748b';
    ctx.fillRect(this.width / 2 - 3, 28, 6, this.height - 28);

    // Warning sign diamond
    ctx.save();
    ctx.translate(this.width / 2, 18);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = '#eab308';
    ctx.fillRect(-14, -14, 28, 28);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;
    ctx.strokeRect(-14, -14, 28, 28);
    ctx.restore();

    // Exclamation mark
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('!', this.width / 2, 23);
  }
}
