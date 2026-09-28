import { StationData } from '../types';
import { getServiceById } from '../data/services';

export class ServiceStation implements StationData {
  public id: string;
  public serviceId: string;
  public x: number;
  public y: number;
  public width: number = 90;
  public height: number = 130;
  public completed: boolean = false;

  private pulseTimer: number = 0;

  constructor(data: { serviceId: string; x: number }, groundY: number) {
    this.serviceId = data.serviceId;
    this.id = `station_${data.serviceId}_${data.x}`;
    this.x = data.x;
    this.y = groundY - this.height;
  }

  public update(deltaTime: number): void {
    this.pulseTimer += deltaTime * 4;
  }

  public render(ctx: CanvasRenderingContext2D, cameraX: number, isPlayerNear: boolean): void {
    const screenX = this.x - cameraX;
    const screenY = this.y;
    const service = getServiceById(this.serviceId);
    const themeColor = service?.colorTheme || '#0066cc';

    ctx.save();
    ctx.translate(screenX, screenY);

    // Kiosk base platform
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(-8, this.height - 12, this.width + 16, 12, 4);
    ctx.fill();

    // Glowing base line
    ctx.strokeStyle = this.completed ? '#10b981' : '#38bdf8';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Main Kiosk pillar body
    const grad = ctx.createLinearGradient(0, 0, this.width, this.height);
    grad.addColorStop(0, '#1e293b');
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(10, 20, this.width - 20, this.height - 30, 8);
    ctx.fill();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Station Canopy top roof
    ctx.fillStyle = themeColor;
    ctx.beginPath();
    ctx.roundRect(0, 10, this.width, 16, 4);
    ctx.fill();

    // Billboard Display Screen
    ctx.fillStyle = '#020617';
    ctx.beginPath();
    ctx.roundRect(16, 32, this.width - 32, 54, 4);
    ctx.fill();
    ctx.strokeStyle = this.completed ? '#10b981' : themeColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Station Screen Content: Service Icon / Badge
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('TRẠM SỐ', this.width / 2, 48);

    ctx.fillStyle = this.completed ? '#10b981' : '#38bdf8';
    ctx.font = 'bold 12px sans-serif';
    const displayName = service ? service.name.replace('VNPT ', '') : this.serviceId.toUpperCase();
    ctx.fillText(displayName.slice(0, 9), this.width / 2, 66);

    // Status Indicator Light
    const pulseAlpha = 0.5 + Math.sin(this.pulseTimer) * 0.4;
    ctx.fillStyle = this.completed
      ? '#10b981'
      : `rgba(56, 189, 248, ${pulseAlpha})`;
    ctx.beginPath();
    ctx.arc(this.width / 2, 77, 4, 0, Math.PI * 2);
    ctx.fill();

    // Antenna & Signal Waves on top
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(this.width / 2 - 2, -10, 4, 20);

    // Glowing Antenna Orb
    ctx.fillStyle = this.completed ? '#10b981' : '#38bdf8';
    ctx.beginPath();
    ctx.arc(this.width / 2, -12, 5, 0, Math.PI * 2);
    ctx.fill();

    // Broadcast arcs if not completed
    if (!this.completed) {
      ctx.strokeStyle = `rgba(56, 189, 248, ${pulseAlpha * 0.7})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(this.width / 2, -12, 12, -Math.PI * 0.75, -Math.PI * 0.25);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(this.width / 2, -12, 18, -Math.PI * 0.75, -Math.PI * 0.25);
      ctx.stroke();
    }

    // Floating Interaction Badge if player is approaching or completed
    if (this.completed) {
      // Completed Checkmark Badge
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.roundRect(14, -36, this.width - 28, 20, 10);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('✓ ĐÃ XONG', this.width / 2, -22);
    } else if (isPlayerNear) {
      // Urgent Prompt
      const bounce = Math.sin(this.pulseTimer * 1.5) * 4;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.roundRect(6, -44 + bounce, this.width - 12, 24, 6);
      ctx.fill();
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('TRUY CẬP TRẠM', this.width / 2, -28 + bounce);
    }

    ctx.restore();
  }
}
