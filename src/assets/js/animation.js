export default class Player {
  constructor(img, canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.img = img;
    this.spriteWidth = 32; // width of a single frame in image
    this.spriteHeight = 32; // height of a single frame in image
    this.width = this.spriteWidth; // width of frame
    this.height = this.spriteHeight; // height of frame
    this.scale = 6; // set scale of image to small or large image
    this.x = this.canvasWidth / 2 - (this.width * this.scale) / 2; // to set position iamge -> now is set image to center ==> if this.x = 50 this mean pushing the image to the right 50px
    this.y = this.canvasHeight / 2 - (this.height * this.scale) / 2; // to set position image -> now is set image to center ==> if this.y = 20 this mean pushing the image to down 20px
    this.minFrame = 0; // min number frame in image
    this.maxFrame = 28; // max number frame in image
    this.frame = 0; // current active frame between minFrame and maxFrame
    this.frameX = 0; // to map and swop horizontal frame
    this.frameY = 0; // to map and swaop vertical frame
  }
  draw(context) {
    // context.drawImage(this.img, this.x, this.y, this.width, this.height); // to fit iamge with size of canvas frame
    context.drawImage(
      this.img,
      this.frameX * this.spriteWidth, // number * this.spriteWidth means move to the right one by one in single frame like 6 * this.spriteWidth means move to frame 6 in row
      this.frameY * this.spriteHeight, // number * this.spriteHeight means move down one by one in each row like 2 * this.spriteHeight means move  down to row 2
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.scale * this.width,
      this.scale * this.height
    );
  }
  update() {
    this.frame = this.frame < this.maxFrame ? this.frame + 1 : this.minFrame;
    this.frameX = this.frame % 28; // devided by 18 cuz each row has 18 frames ==> to get horizontal frame
    this.frameY = Math.floor(this.frame / 28); // devided by 18 cuz each row has 18 frames ==> to get vertical frame
  }
  idle() {
    this.minFrame = 0;
    this.maxFrame = 8;
    this.frame = this.minFrame;
  }
  run() {
    this.minFrame = 9;
    this.maxFrame = 14;
    this.frame = this.minFrame;
  }
  hurt() {
    this.minFrame = 15;
    this.maxFrame = 18;
    this.frame = this.minFrame;
  }
  dead() {
    this.minFrame = 19;
    this.maxFrame = 22;
    this.frame = this.minFrame;
  }
  attack() {
    this.minFrame = 23;
    this.maxFrame = 27;
    this.frame = this.minFrame;
  }
}
