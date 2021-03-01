'use strict';

const path = require('path');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');
const Controller = require('egg').Controller;
const { severBaseUrl } = require('../../config/index.js');

class ProjectController extends Controller {
  async index() {
    const { ctx } = this;
    const { params: { name } } = ctx;
    try {
      const regRes = name.match(/\.\w+$/) || [];
      if (!regRes) throw Error;
      const [type] = regRes;
      const mapObj = {
        docx: 'application/msword',
        doc: 'application/msword',
        jpg: 'image/jpeg',
        png: 'image/png',
        mp4: 'application/octet-stream',
        xlsx: 'application/vnd.ms-excel',
        xls: 'application/vnd.ms-excel',
        zip: 'application/zip',
        csv: 'text/csv',
        txt: 'text/plain',
      };
      const result = fs.readFileSync(`app/public/files/${name}`);
      ctx.set('content-type', `${mapObj[type]};charset=UTF-8`);
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      console.log(error);
      ctx.status = 500;
      ctx.body = {
        code: -2,
        data: '不存在该类型文件，目前仅支持[docx, doc, jpg, png, mp4, xlsx, xls, zip, csv, txt]',
      };
    }
  }

  async defaultFile() {
    const { ctx } = this;
    const { params: { name } } = ctx;
    try {
      const regRes = name.match(/\.?\w+$/) || [];
      if (!regRes) throw Error;
      const [type] = regRes;
      console.log(regRes);
      console.log(type);
      const mapObj = {
        docx: 'application/msword',
        doc: 'application/msword',
        jpg: 'image/jpeg',
        png: 'image/png',
        mp4: 'application/octet-stream',
        xlsx: 'application/vnd.ms-excel',
        xls: 'application/vnd.ms-excel',
        zip: 'application/zip',
        csv: 'text/csv',
        txt: 'text/plain',
      };
      const result = fs.readFileSync(`app/public/defaultFiles/test.${type}`);
      ctx.set('content-type', `${mapObj[type]};charset=UTF-8`);
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        code: -2,
        data: '不存在该类型文件，目前仅支持[docx, doc, jpg, png, mp4, xlsx, xls, zip, csv, txt]',
      };
    }
  }

  async upload() {
    console.log(severBaseUrl);
    const { ctx } = this;
    const parts = ctx.multipart();

    let part;
    const result = [];
    while ((part = await parts()) != null) {
      if (part.length) {
        // formData中 除二进制值之外的其他字段 比如：[ 'index', '1', false, false ]
      } else {
        if (!part.filename) {
          continue;
        }
        const file = {};
        file.name = part.filename;
        file.type = part.mimeType;

        console.log(severBaseUrl);

        const filePath = path.join(
          process.cwd(),
          '/app/public/files/',
          file.name
        );
        const writable = fs.createWriteStream(filePath);
        try {
          await part.pipe(writable);
          file.path = `${severBaseUrl}/files/${file.name}`; //
          result.push(file);
          ctx.body = {
            code: 200,
            data: {
              file,
            },
          };
        } catch (error) {
          await sendToWormhole(part);
          ctx.status = 500;
          ctx.body = {
            code: -2,
            data: '上传失败, 可能不支持此类型，需添加白名单',
          };
        }
      }
    }
  }
}

module.exports = ProjectController;
