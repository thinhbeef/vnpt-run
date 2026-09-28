export class ParallaxRenderer {
  private clouds: { x: number; y: number; scale: number; speed: number }[] = [];
  private dataPackets: { x: number; speed: number; color: string }[] = [];

  constructor() {
    // Generate some clouds
    for (let i = 0; i < 8; i++) {
      this.clouds.push({
        x: i * 300 + Math.random() * 150,
        y: 40 + Math.random() * 80,
        scale: 0.6 + Math.random() * 0.7,
        speed: 0.2 + Math.random() * 0.3,
      });
    }

    // Data packets running through optical cables under road
    for (let i = 0; i < 15; i++) {
      this.dataPackets.push({
        x: Math.random() * 4000,
        speed: 2 + Math.random() * 4,
        color: i % 2 === 0 ? '#38bdf8' : '#00e5ff',
      });
    }
  }

  public update(deltaTime: number): void {
    for (const cloud of this.clouds) {
      cloud.x += cloud.speed;
      if (cloud.x > 3000) {
        cloud.x = -200;
      }
    }

    for (const packet of this.dataPackets) {
      packet.x += packet.speed;
      if (packet.x > 6000) {
        packet.x = 0;
      }
    }
  }

  public render(
    ctx: CanvasRenderingContext2D,
    cameraX: number,
    width: number,
    height: number,
    groundY: number,
    worldLength: number,
    theme: 'office' | 'city' | 'digital_gov' = 'office'
  ): void {
    // --- LAYER 1: SKY & TECH GRID ---
    const skyGrad = ctx.createLinearGradient(0, 0, 0, groundY);
    if (theme === 'office') {
      skyGrad.addColorStop(0, '#0f172a');
      skyGrad.addColorStop(0.5, '#1e293b');
      skyGrad.addColorStop(1, '#0284c7');
    } else if (theme === 'city') {
      skyGrad.addColorStop(0, '#020617');
      skyGrad.addColorStop(0.5, '#0369a1');
      skyGrad.addColorStop(1, '#0284c7');
    } else {
      skyGrad.addColorStop(0, '#090d16');
      skyGrad.addColorStop(0.6, '#1e1b4b');
      skyGrad.addColorStop(1, '#4338ca');
    }
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, groundY);

    // Tech network grid / constellation lines in sky
    ctx.save();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.lineWidth = 1;
    const gridOffset = (cameraX * 0.05) % 80;
    for (let x = -gridOffset; x < width; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, groundY);
      ctx.stroke();
    }
    for (let y = 30; y < groundY; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    ctx.restore();

    // Render clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    for (const cloud of this.clouds) {
      const cx = (cloud.x - cameraX * 0.08) % (width + 400);
      const drawX = cx < -200 ? cx + width + 400 : cx;
      this.drawCloud(ctx, drawX, cloud.y, cloud.scale);
    }

    // --- LAYER 2: DISTANT SKYLINE & TELECOM TOWERS (Parallax 0.18) ---
    ctx.save();
    const l2Offset = (cameraX * 0.18) % 400;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    for (let i = -1; i < Math.ceil(width / 160) + 2; i++) {
      const bx = i * 160 - l2Offset;
      const bHeight = 110 + ((i * 37) % 80);
      ctx.fillRect(bx, groundY - bHeight, 140, bHeight);

      // Windows
      ctx.fillStyle = 'rgba(254, 240, 138, 0.2)';
      for (let wy = groundY - bHeight + 14; wy < groundY - 20; wy += 22) {
        for (let wx = bx + 12; wx < bx + 120; wx += 24) {
          if ((wx + wy) % 5 !== 0) {
            ctx.fillRect(wx, wy, 10, 10);
          }
        }
      }
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';

      // Telecom Antenna tower on every 3rd building
      if (i % 3 === 0) {
        const tx = bx + 70;
        const ty = groundY - bHeight;
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(tx, ty - 45);
        ctx.stroke();

        // Antenna crossbars
        ctx.beginPath();
        ctx.moveTo(tx - 12, ty - 25);
        ctx.lineTo(tx + 12, ty - 25);
        ctx.moveTo(tx - 8, ty - 35);
        ctx.lineTo(tx + 8, ty - 35);
        ctx.stroke();

        // Blinking red aircraft beacon
        const blink = Math.floor(Date.now() / 600) % 2 === 0;
        ctx.fillStyle = blink ? '#ef4444' : '#7f1d1d';
        ctx.beginPath();
        ctx.arc(tx, ty - 46, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();

    // --- LAYER 3: MID-GROUND STREET BUILDINGS & LAMPS (Parallax 0.45) ---
    ctx.save();
    const l3Offset = (cameraX * 0.45) % 360;
    for (let i = -1; i < Math.ceil(width / 180) + 2; i++) {
      const bx = i * 180 - l3Offset;
      const bHeight = 70 + ((i * 41) % 45);

      // Modern office facades with VNPT blue tints
      ctx.fillStyle = i % 2 === 0 ? '#1e293b' : '#0f172a';
      ctx.fillRect(bx, groundY - bHeight, 160, bHeight);

      // Glowing blue accent strips
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(bx, groundY - bHeight, 160, 4);

      // Street light pole
      const lx = bx + 80;
      ctx.fillStyle = '#64748b';
      ctx.fillRect(lx, groundY - 60, 4, 60);
      ctx.fillRect(lx - 12, groundY - 62, 28, 4);

      // Light glow
      ctx.fillStyle = 'rgba(250, 204, 21, 0.4)';
      ctx.beginPath();
      ctx.arc(lx + 12, groundY - 58, 6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // --- LAYER 4: GROUND / ROAD & OPTICAL CABLES ---
    // Sidewalk curb
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, groundY - 6, width, 6);

    // Asphalt road surface
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, groundY, width, height - groundY);

    // Glowing Optical Fiber Cable Conduit Tube running along top of road
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, groundY + 4, width, 14);
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(0, groundY + 4, width, 14);

    // High speed data packets pulsing through fiber
    for (const packet of this.dataPackets) {
      const px = packet.x - cameraX;
      if (px >= -20 && px <= width + 20) {
        ctx.fillStyle = packet.color;
        ctx.beginPath();
        ctx.roundRect(px, groundY + 8, 18, 6, 3);
        ctx.fill();
      }
    }

    // Road dashed lane divider
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.setLineDash([32, 28]);
    const roadDashOffset = cameraX % 60;
    ctx.beginPath();
    ctx.moveTo(-roadDashOffset, groundY + 48);
    ctx.lineTo(width + 60, groundY + 48);
    ctx.stroke();
    ctx.setLineDash([]);

    // --- FINISH LINE ARCHWAY ---
    this.renderFinishLine(ctx, cameraX, groundY, worldLength);
  }

  private drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number): void {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.arc(20, 20, 20, 0, Math.PI * 2);
    ctx.arc(45, 12, 24, 0, Math.PI * 2);
    ctx.arc(70, 20, 20, 0, Math.PI * 2);
    ctx.arc(35, 28, 16, 0, Math.PI * 2);
    ctx.arc(55, 28, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  private renderFinishLine(
    ctx: CanvasRenderingContext2D,
    cameraX: number,
    groundY: number,
    worldLength: number
  ): void {
    const fx = worldLength - cameraX;
    const archWidth = 140;
    const archHeight = 180;

    ctx.save();
    ctx.translate(fx, groundY - archHeight);

    // Arch pillars
    // Left pillar
    ctx.fillStyle = '#0066cc';
    ctx.fillRect(0, 0, 18, archHeight);
    // Right pillar
    ctx.fillRect(archWidth - 18, 0, 18, archHeight);

    // Top banner
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.roundRect(-10, 0, archWidth + 20, 48, 8);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Text on banner
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ĐÍCH ĐẾN', archWidth / 2, 22);

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('HÀNH TRÌNH SỐ', archWidth / 2, 38);

    // Checkered finish banner ribbon
    const checkSize = 12;
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < archWidth / checkSize; c++) {
        ctx.fillStyle = (r + c) % 2 === 0 ? '#ffffff' : '#000000';
        ctx.fillRect(c * checkSize, 48 + r * checkSize, checkSize, checkSize);
      }
    }

    // Finish floor tape
    ctx.fillStyle = '#10b981';
    ctx.fillRect(0, archHeight - 6, archWidth, 6);

    ctx.restore();
  }
}
