'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    const user = await ctx.model.User.findAll(query);
    ctx.body = {
      user,
    };
  }

  async show() {
    const user = await this.ctx.model.User.findByPk(toInt(this.ctx.params.id));
    console.log('user: ', user);
    this.ctx.body = {
      user,
    };
  }
  async create() {
    const { name, age } = this.ctx.request.body;
    const user = await this.ctx.model.User.create({ name, age });
    this.ctx.status = 202;
    this.ctx.body = {
      user,
    };
  }

  async update() {
    const { name, age } = this.ctx.request.body;
    const user = await this.ctx.model.User.findByPk(this.ctx.params.id);
    if (!user) {
      this.ctx.body = {
        message: '无该用户',
      };
      this.ctx.status = 404;
      return;
    }
    await user.update({ name, age });
    this.ctx.body = {
      user,
    };
  }

  async destroy() {
    const id = this.ctx.params.id;
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      this.ctx.body = '无该用户';
      this.ctx.status = 404;
      return;
    }
    await user.destroy();
    this.ctx.status = 204;
  }

}

module.exports = UserController;
