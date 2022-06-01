const { Contract } = require("fabric-contract-api");
const stringify  = require('json-stringify-deterministic');
const crypto = require("crypto");

class KVContract extends Contract {
  constructor() {
    super("KVContract");
  }

  async instantiate() {
    // function that will be invoked on chaincode instantiation
  }

  async put(ctx, pubkey, attribute, provider, availability){
  //  await exists = await this.PubkeyExists(ctx, pubkey);
    //if(exists){
      //return{error: "The User Already Exists"};
    //}
    const ACL = {
      ID: pubkey,
      Attribute: attribute,
      Provider: provider,
      availability: availability
    }
    await ctx.stub.putState(pubkey, Buffer.from(stringify(ACL)));
    return { success:"OK"};
  }
//  async put(ctx, key, value ) {
  //  await ctx.stub.putState(key, Buffer.from(value));
    //return { success: "OK" };
  //}

  async get(ctx, key) {
    const buffer = await ctx.stub.getState(key);
    if (!buffer || !buffer.length) return { error: "NOT_FOUND" };
    return { success: buffer.toString() };
  }

  async putPrivateMessage(ctx, collection) {
    const transient = ctx.stub.getTransient();
    const message = transient.get("message");
    await ctx.stub.putPrivateData(collection, "message", message);
    return { success: "OK" };
  }

  async getPrivateMessage(ctx, collection) {
    const message = await ctx.stub.getPrivateData(collection, "message");
    const messageString = message.toBuffer ? message.toBuffer().toString() : message.toString();
    return { success: messageString };
  }

  async verifyPrivateMessage(ctx, collection) {
    const transient = ctx.stub.getTransient();
    const message = transient.get("message");
    const messageString = message.toBuffer ? message.toBuffer().toString() : message.toString();
    const currentHash = crypto.createHash("sha256").update(messageString).digest("hex");
    const privateDataHash = (await ctx.stub.getPrivateDataHash(collection, "message")).toString("hex");
    if (privateDataHash !== currentHash) {
      return { error: "VERIFICATION_FAILED" };
    }
    return { success: "OK" };
  }
}

exports.contracts = [KVContract];
