const { exec } = require('child_process');
const fs = require("fs")
const traverse = require('traverse');
const bitcoin = require('bitcoinjs-lib');
const path = require("path");
class Goat {
  async raw(id, options) {
    if (options && options.http) {
      return new Promise((resolve, reject) => {
        fetch(`https://blockchain.info/rawtx/${id}`).then((res) => {
          return res.json()
        }).then((res) => {
          let witness
          traverse(res).forEach(function (value) {
            if (this.key === 'witness') {
              witness = value;
            }
          });
          resolve(witness)
        }).catch((e) => {
          reject(e)
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        exec(`bitcoin-cli getrawtransaction ${id}`, (err, stdout, stderr) => {
          if (err) {
            reject(err);
          } else if (stderr) {
            reject(stderr);
          } else {
            resolve(stdout.trim());
          }
        });
      });
    }
  }
  async get(id, dest, options) {
    let buf = await this.data(id, null, options)
    await fs.promises.writeFile(path.resolve(dest), buf)
  }
  async cat(id, options) {
    let str = await this.data(id, "utf8", options)
    return str
  }
  async hex(id, options) {
    let hex = await this.data(id, "hex", options)
    return hex
  }
  async buf(id, options) {
    let buf = await this.data(id, null, options)
    return buf
  }
  async data(id, encoding, options) {
    let raw = await this.raw(id, options)
    const decompiled = bitcoin.script.decompile(Buffer.from(raw, 'hex'))
    const asm = bitcoin.script.toASM(decompiled)
    const start = Buffer.from("text/plain;charset=utf-8").toString("hex")
    const re = new RegExp(`${start}(.*) OP_ENDIF [0-9a-f]+$`, "g")
    const extracted = re.exec(asm)
    let hex = extracted[1].split(" ").filter((chunk) => { return !chunk.startsWith("OP_") }).join("")
    if (encoding === "utf8") {
      return Buffer.from(hex, "hex").toString()
    } else if (encoding === "hex") {
      return hex
    } else {
      return Buffer.from(hex, "hex")
    }
  }
}
module.exports = Goat
