'use strict';

const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path');

class ImageController extends Controller {
  async create() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    console.log('file: ', file);
    const name = path.basename(file.filename);
    try {
      const pathname = path.join(__dirname, `../public/${name}`);
      fs.copyFileSync(file.filepath, pathname);
      // fs.writeFileSync(pathname, file.filepath);
      console.log('图片写入成功');
      ctx.body = {
        message: '图片写入成功',
        url: `http://127.0.0.1:7001/public/${name}`,
      };
      ctx.status = 200;
    } catch (e) {
      console.log(e);
    } finally {
      fs.unlink(file.filepath);
    }
  }
  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    console.log('file: ', file);
    const datatime = new Date().getTime();
    const name = `${datatime}-${path.basename(file.filename)}`;
    try {
      const buffer = fs.readFileSync(file.filepath);
      const image = await ctx.model.Image.create({
        name,
        data: buffer,
        url: `/image/${name}`,
      });
      ctx.body = {
        image,
      };
      ctx.status = 200;
    } catch (e) {
      console.log(e);
    } finally {
      fs.unlink(file.filepath);
    }
  }
  async getImage() {
    const name = this.ctx.params.name;
    const image = await this.ctx.model.Image.findOne({ where: { name } });
    if (!image) {
      this.ctx.body = '无该照片';
      this.ctx.status = 400;
      return;
    }
    this.ctx.response.set('Content-Type', 'image/png');
    this.ctx.body = image.data;

  }
}

module.exports = ImageController;
