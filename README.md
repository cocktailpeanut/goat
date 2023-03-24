# Goat

Goat is a simple library for fetching Bitcoin inscribed data from transaction IDs (currently supporting [Ordinals](https://ordinals.com)).

![goat.gif](goat.gif)

# How it works

All you need is give goat a Bitcoin transaction ID, and it will give you the inscribed data. The data can be anything. JSON, YAML, etc. **(Currently only supports textual content).**

1. **Bitcoin mode:** When you run a goat command, by default it tries to fetch from a local Bitcoin node through RPC (if it's running)
2. **HTTP mode:** If there is no Bitcoin node running, it tries to fetch the raw transaction using a blockchain API.

This ensures that:

1. Even in the worst case you can always synchronize data through Bitcoin
2. But in most other cases you can use the convenient HTTP API (since most people don't run their own Bitcoin node)

# What Goat can be used for

1. **Decentralized script:** Decentralized Dockerfile, docker-compose, and various simple scripts.
2. **Decentralized pointer:** You can include anything in your files, such as links to other decentralized storage systems (magnet URIs, IPFS CIDs, and so on). This way you don't have to bloat up the blockchain yet still enjoy the secure and decentralized storage.

# What this library does NOT do

1. **URIs not included:** It does NOT include any instructions, addresses, or transaction IDs for downloading files. It's simply a library that fetches data from Bitcoin, given a transaction ID.
2. **No upload (at the moment):** It's "download only". If you have already posted something on Bitcoin using the Ordinals protocol, you can download using the simple goat command.

> **NOTE**
> 
> If you want to use Goat, you must first store whatever you want on Bitcoin using Ordinals. You can do it yourself by using the official [Ordinals indexer + wallet](https://ordinals.com) or 3rd party services like [Ordinalsbot](https://ordinalsbot.com/)

# Quickstart

Let's try something for fun!

First install GOAT:

```
npm install -g goatnet
```

Now let's try fetching some random data from Bitcoin:

```
goat cat 3aa27d82d84caede8e885f39eb1fc92d01a080e14f5b1a36b28d4764d4f594fd
```

This will display:

```
{
  "name": "psbt.ord"
}
```

Now let's try saving it to a file:

```
goat get 3aa27d82d84caede8e885f39eb1fc92d01a080e14f5b1a36b28d4764d4f594fd psbt.json
```

When you run the command, you'll see that the content will be stored at `psbt.json`


# Install

```
npm install -g goatnet
```


# Usage

## 1. cat

Fetch the data embedded in the Bitcoin transaction at `txid` and print to screen

```
goat cat [txid]
```

## 2. get

Download the data embedded in the Bitcoin transaction at `txid` into a file at `file path`:

```
goat get [txid] [file path]
```

