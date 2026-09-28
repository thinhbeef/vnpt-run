import { PlayerAction } from '../types';

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export class Player {
  public x: number = 100;
  public y: number = 380;
  public vx: number = 0;
  public vy: number = 0;
  public width: number = 46;
  public height: number = 72;
  public groundY: number = 420;

  public state: PlayerAction = 'idle';
  public isGrounded: boolean = true;
  public isSliding: boolean = false;
  public hurtCooldown: number = 0; // seconds remaining
  public isInvulnerable: boolean = false;

  public animTimer: number = 0;
  public particles: Particle[] = [];

  private gravity: number = 0.68;
  private jumpForce: number = -14.5;

  constructor(startX: number = 100, groundY: number = 420) {
    this.x = startX;
    this.groundY = groundY;
    this.y = groundY - this.height;
  }

  public reset(startX: number = 100, groundY: number = 420) {
    this.x = startX;
    this.groundY = groundY;
    this.width = 46;
    this.height = 72;
    this.y = groundY - this.height;
    this.vx = 0;
    this.vy = 0;
    this.state = 'idle';
    this.isGrounded = true;
    this.isSliding = false;
    this.hurtCooldown = 0;
    this.isInvulnerable = false;
    this.animTimer = 0;
    this.particles = [];
  }

  public jump(): boolean {
    if (this.isGrounded && !this.isSliding && this.state !== 'hurt') {
      this.vy = this.jumpForce;
      this.isGrounded = false;
      this.state = 'jump';

      // Spawn ground launch particles
      for (let i = 0; i < 6; i++) {
        this.particles.push({
          x: this.x + this.width / 2 + (Math.random() * 20 - 10),
          y: this.groundY - 2,
          vx: (Math.random() - 0.5) * 4 - 2,
          vy: -Math.random() * 2 - 0.5,
          size: Math.random() * 4 + 2,
          alpha: 0.8,
          color: '#cbd5e1',
        });
      }
      return true;
    }
    return false;
  }

  public setSlide(sliding: boolean) {
    if (this.isGrounded && this.state !== 'hurt') {
      if (sliding && !this.isSliding) {
        this.isSliding = true;
        this.height = 40;
        this.width = 54;
        this.y = this.groundY - this.height;
        this.state = 'slide';

        // Slide dust
        for (let i = 0; i < 4; i++) {
          this.particles.push({
            x: this.x + 5,
            y: this.groundY - 2,
            vx: -Math.random() * 3 - 2,
            vy: -Math.random() * 1.5,
            size: Math.random() * 3 + 2,
            alpha: 0.7,
            color: '#94a3b8',
          });
        }
      } else if (!sliding && this.isSliding) {
        this.isSliding = false;
        this.height = 72;
        this.width = 46;
        this.y = this.groundY - this.height;
        this.state = 'run';
      }
    }
  }

  public triggerHurt(): void {
    if (this.hurtCooldown > 0) return;
    this.hurtCooldown = 1.4; // 1.4 seconds invulnerability
    this.state = 'hurt';
    this.vy = -6; // small bounce
    this.isGrounded = false;

    // Red impact sparks
    for (let i = 0; i < 12; i++) {
      this.particles.push({
        x: this.x + this.width / 2,
        y: this.y + this.height / 2,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        size: Math.random() * 4 + 3,
        alpha: 1.0,
        color: '#ef4444',
      });
    }
  }

  public update(deltaTime: number, baseSpeed: number, isAutoRunning: boolean): void {
    this.animTimer += deltaTime * 12;

    // Hurt cooldown
    if (this.hurtCooldown > 0) {
      this.hurtCooldown -= deltaTime;
      this.isInvulnerable = true;
      if (this.hurtCooldown <= 0) {
        this.hurtCooldown = 0;
        this.isInvulnerable = false;
        if (this.state === 'hurt') {
          this.state = isAutoRunning ? 'run' : 'idle';
        }
      }
    }

    // Horizontal movement if auto running
    if (isAutoRunning && this.state !== 'hurt') {
      this.x += baseSpeed;
    }

    // Vertical physics
    this.vy += this.gravity;
    this.y += this.vy;

    // Ground check
    if (this.y >= this.groundY - this.height) {
      this.y = this.groundY - this.height;
      this.vy = 0;
      if (!this.isGrounded) {
        // Just landed: spawn landing dust
        this.isGrounded = true;
        for (let i = 0; i < 5; i++) {
          this.particles.push({
            x: this.x + this.width / 2 + (Math.random() * 20 - 10),
            y: this.groundY - 2,
            vx: (Math.random() - 0.5) * 3,
            vy: -Math.random() * 1.5,
            size: Math.random() * 3 + 2,
            alpha: 0.6,
            color: '#cbd5e1',
          });
        }
      }
    } else {
      this.isGrounded = false;
    }

    // Determine state
    if (this.state !== 'hurt') {
      if (!this.isGrounded) {
        this.state = this.vy < 0 ? 'jump' : 'fall';
      } else if (this.isSliding) {
        this.state = 'slide';
      } else if (isAutoRunning) {
        this.state = 'run';
      } else {
        this.state = 'idle';
      }
    }

    // Running dust particles
    if (this.state === 'run' && Math.sin(this.animTimer) > 0.8) {
      this.particles.push({
        x: this.x + 4,
        y: this.groundY - 2,
        vx: -baseSpeed * 0.4 - Math.random() * 1.5,
        vy: -Math.random() * 1.2,
        size: Math.random() * 3 + 1.5,
        alpha: 0.5,
        color: '#e2e8f0',
      });
    }

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= deltaTime * 1.8;
      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D, cameraX: number): void {
    const screenX = this.x - cameraX;
    const screenY = this.y;

    // Render particles behind/around
    for (const p of this.particles) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x - cameraX, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // If invulnerable during hurt, blink rapidly
    if (this.isInvulnerable && Math.floor(this.hurtCooldown * 16) % 2 === 0) {
      return; // Skip rendering frame for flicker effect
    }

    ctx.save();
    ctx.translate(screenX, screenY);

    if (this.state === 'slide') {
      this.renderSlidePose(ctx);
    } else {
      this.renderStandardPose(ctx);
    }

    ctx.restore();
  }

  private renderStandardPose(ctx: CanvasRenderingContext2D): void {
    const isJumping = this.state === 'jump';
    const isFalling = this.state === 'fall';
    const isRunning = this.state === 'run';
    const isHurt = this.state === 'hurt';

    // Animation oscillations
    const legPhase = isRunning ? Math.sin(this.animTimer) : 0;
    const armPhase = isRunning ? Math.cos(this.animTimer) : 0;
    const bounceY = isRunning ? Math.abs(Math.sin(this.animTimer * 2)) * 3 : 0;

    // --- LEGS (Dark navy pants #1e293b) ---
    ctx.fillStyle = '#1e293b';

    // Back leg
    const backLegAngle = isJumping ? 0.3 : isFalling ? -0.2 : legPhase * 0.6;
    ctx.save();
    ctx.translate(26, 46 - bounceY);
    ctx.rotate(backLegAngle);
    ctx.fillRect(-5, 0, 10, 22);
    // Back shoe (White sneaker with VNPT blue stripe)
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-6, 18, 14, 7);
    ctx.fillStyle = '#0066cc';
    ctx.fillRect(-4, 20, 10, 2);
    ctx.restore();

    // Front leg
    const frontLegAngle = isJumping ? -0.4 : isFalling ? 0.3 : -legPhase * 0.6;
    ctx.save();
    ctx.translate(16, 46 - bounceY);
    ctx.rotate(frontLegAngle);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-5, 0, 10, 22);
    // Front shoe
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-6, 18, 14, 7);
    ctx.fillStyle = '#0066cc';
    ctx.fillRect(-4, 20, 10, 2);
    ctx.restore();

    // --- TORSO / VNPT POLO SHIRT (#0066cc) ---
    ctx.save();
    ctx.translate(0, -bounceY);

    // Polo Body
    ctx.fillStyle = isHurt ? '#ef4444' : '#0066cc';
    ctx.beginPath();
    ctx.roundRect(10, 22, 26, 26, 4);
    ctx.fill();

    // Polo collar (Cyan / White accent)
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(18, 22);
    ctx.lineTo(23, 27);
    ctx.lineTo(28, 22);
    ctx.fill();

    // VNPT Company Employee ID Badge Lanyard (Red cord + white ID card)
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(19, 23);
    ctx.lineTo(23, 33);
    ctx.lineTo(27, 23);
    ctx.stroke();

    // ID Badge card
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(20, 31, 7, 10);
    ctx.fillStyle = '#0066cc';
    ctx.fillRect(21, 33, 5, 2); // Badge photo placeholder
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(21, 37, 5, 1);

    // --- HEAD & FACE ---
    // Skin tone
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(23, 13, 11, 0, Math.PI * 2);
    ctx.fill();

    // Friendly face (Eye & Smile)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(27, 11, 3, 3); // Eye facing right
    ctx.beginPath();
    ctx.arc(26, 17, 3, 0, Math.PI, false); // Smile
    ctx.stroke();

    // Hair / Cap (VNPT Blue Cap with visor)
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(23, 10, 12, Math.PI, 0); // Cap dome
    ctx.fill();
    // Cap visor extending right
    ctx.fillRect(25, 8, 12, 4);

    // --- ARMS ---
    // Back arm
    ctx.save();
    ctx.translate(14, 25);
    const armAngle = isJumping ? -1.2 : isHurt ? 1.0 : armPhase * 0.7;
    ctx.rotate(armAngle);
    ctx.fillStyle = isHurt ? '#ef4444' : '#0066cc';
    ctx.fillRect(-3, 0, 7, 14);
    // Hand
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(0, 15, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Front arm
    ctx.save();
    ctx.translate(28, 25);
    ctx.rotate(-armAngle);
    ctx.fillStyle = isHurt ? '#ef4444' : '#0066cc';
    ctx.fillRect(-3, 0, 7, 14);
    // Hand
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(0, 15, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore(); // end torso bounce
  }

  private renderSlidePose(ctx: CanvasRenderingContext2D): void {
    // Sliding pose: character leans back, sliding horizontally
    ctx.save();
    // Torso lying lower
    ctx.fillStyle = '#0066cc';
    ctx.beginPath();
    ctx.roundRect(8, 14, 28, 18, 4);
    ctx.fill();

    // Head
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(14, 10, 9, 0, Math.PI * 2);
    ctx.fill();

    // Cap
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(14, 7, 10, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(16, 5, 10, 3);

    // Legs outstretched forward
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(32, 22, 20, 10);
    // Shoes
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(48, 18, 8, 14);
    ctx.fillStyle = '#0066cc';
    ctx.fillRect(50, 22, 4, 3);

    // Arms back for balance
    ctx.fillStyle = '#0066cc';
    ctx.fillRect(2, 20, 12, 6);
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(2, 23, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}
