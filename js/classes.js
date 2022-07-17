class Player {
  constructor({ position, size, color }) {
    this.x = position.x;
    this.y = position.y;
    this.w = size.w;
    this.h = size.h;
    this.color = color;
    this.velocity = {
      x : 0,
      y : 0
    };
    this.keys = {
      w : false,
      a : false,
      s : false,
      d : false
    };
    this.limbsUi = Array.from(document.querySelectorAll(".limb"));
    this.numberOfLimbs = 4;
  }

  draw() {
    ctx.drawImage(playerImg, this.x, this.y);
  }

  move() {
    if (this.keys.w) {
      this.velocity.y = -5;
    }
    if (this.keys.a) {
      this.velocity.x = -5;
    }
    if (this.keys.s) {
      this.velocity.y = 5;
    }
    if (this.keys.d) {
      this.velocity.x = 5;
    }

    if (this.velocity.x !== 0 || this.velocity.y !== 0) {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }
  }

  limbs() {
    if (this.limbsUi.length > this.numberOfLimbs) {
      this.limbsUi[0].style.display = "none";
      this.limbsUi.splice(0, 1);
    }
  }

  update() {
    this.limbs();
    this.move();
    this.draw();
  }
}

class Enemy {
  constructor({ position, size, color }) {
    this.x = position.x;
    this.y = position.y;
    this.w = size.w;
    this.h = size.h;
    this.r = size.r;
    this.velocity = {
      x : 0,
      y : 0
    };
    this.color = color;
    this.targetPoint = {
      x : Math.floor(Math.random() * canvas.width),
      y : Math.floor(Math.random() * canvas.height)
    };
    this.isAttacking = false;
  }

  draw() {
    if (this.isAttacking) {
      ctx.drawImage(sharkMouthImg, this.x - this.w * 1.5, this.y - this.h * 1.5);
    } else {
      ctx.drawImage(sharkFinImg, this.x, this.y);
    }
  }

  move() {
    let tan = Math.atan2(this.targetPoint.y - this.y, this.targetPoint.x - this.x);

    this.velocity.x = Math.cos(tan);
    this.velocity.y = Math.sin(tan);

    if (this.velocity.x !== 0 || this.velocity.y !== 0) {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }

    if (Math.abs(this.x - this.targetPoint.x) < 10 && Math.abs(this.y - this.targetPoint.y) < 10) {
      this.targetPoint.x = Math.floor(Math.random() * canvas.width);
      this.targetPoint.y = Math.floor(Math.random() * canvas.height);
    }
  }

  attack() {
    if (!this.isAttacking && squareCollision({
        x : player.x,
        y : player.y,
        w : player.w,
        h : player.h
      },
      {
        x : this.x - this.w * 1.5,
        y : this.y - this.h * 1.5,
        w : this.w * 4,
        h : this.h * 4
      })) {
      this.isAttacking = true;
      if (player.numberOfLimbs > 0) {
        player.numberOfLimbs--;
      }
      setTimeout(() => {
        this.isAttacking = false;
      }, 1000);
    }
  }

  update() {
    this.move();
    this.draw();
  }
}
