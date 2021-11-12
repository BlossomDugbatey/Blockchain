const bitbasher = require('crypto-js/sha256')

class CryptoBlock{
    constructor(index, current_time, info, nextHash=""){
        this.index = index
        this.current_time = current_time
        this.info = info
        this.nextHash = this.computeHash()
    }

    computeHash(message){
        message = this.index + this.nextHash + this.current_time + JSON.stringify(this.info).toString()
        return bitbasher(message)
    }

}

class Blockchain {
	constructor() {
		this.chain = [this.initBlock()];
		this.difficulty = 4;
	}
	initBlock() {
		return new CryptoBlock(0, "11/11/2021", "Initial Block in our network", "0");
	}
	obtainLatestBlock() {
		return this.chain[this.chain.length - 1];
	}
	addNewBlock(newBlock) {
		newBlock.nextHash = this.obtainLatestBlock().hash;
		newBlock.hash = newBlock.computeHash();
		this.chain.push(newBlock);
	}
	checkChainValidity() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const nextHash = this.chain[i - 1];
			if (currentBlock.hash !== currentBlock.computeHash()) {
				return false;
			}
			if (currentBlock.nextHash !== nextHash.hash) return false;
		}
		return true;
	}
}
let chainCoin = new Blockchain();

console.log("chainCoin mining progressing....");
chainCoin.addNewBlock(
	new CryptoBlock(1, "11/11/2021", {
		sender: "Sample Name",
		recipient: "Sample Name",
		quantity: 200
	})
);
chainCoin.addNewBlock(
	new CryptoBlock(1, "11/11/2021", {
		sender: "Sample Name",
		recipient: "Sample Name",
		quantity: 200
	})
);

console.log(JSON.stringify(chainCoin, null, 4));