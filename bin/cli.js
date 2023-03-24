#!/usr/bin/env node
/*
goat cat <txid>
goat get <txid> <filepath>
*/
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const Goat = require("../index")
const argv = yargs(hideBin(process.argv)).argv
const cmd = argv._[0]
const txid = argv._[1]
const goat = new Goat();
const cat = async (txid) => {
  try {
    const goatfile = await goat.cat(txid)
    console.log(goatfile) 
  } catch (e) {
    const goatfile = await goat.cat(txid, { http: true }) // if bitcoin fails, try with http
    console.log(goatfile) 
  }
}
const get = async (txid, dest) => {
  try {
    await goat.get(txid, dest)
  } catch (e) {
    await goat.get(txid, dest, { http: true }) // if bitcoin fails, try with http
  }
}

if (cmd === "cat") {
  cat(txid)
} else if (cmd === "get") {
  if (argv._.length === 3) {
    const filepath = argv._[2]
    get(txid, filepath)
  } else {
    console.log("Syntax: goat get <txid> <filepath>")
  }
}
