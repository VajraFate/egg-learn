'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    console.log('123');
    // ctx.body = 'hi, egg';
    const data = {
      left: 'left!!!!!!!!!!!!!!!!!',
      right: 'right~~~~',
      name: 'vajra',
      hi: 1,
    };
    const html = await ctx.renderView('home.nj', data);
    // const html = await ctx.renderString('hi, {{ name }}', data, {
    //   viewEngine: 'nunjucks',
    // });
    console.log('html: ', html);
    ctx.body = html;

  }
  async logo() {
    const { ctx } = this;
    console.log('__dirname: ', __dirname, __filename);
    ctx.set('Content-type', 'image/png');
    const img = fs.readFileSync(path.resolve(__dirname, '../view/logo192.png'));
    ctx.body = img;
  }
  async getTest() {
    const data = await this.app.mysql.select('test', { id: 1 });
    this.ctx.body = data;
  }
}

module.exports = HomeController;
