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

  async CreateACL(ctx, pubkey, attribute, provider, availability){
    //put this chech in app.js
    /*const exists = await this.PubkeyExists(ctx, pubkey);
    if(exists){
      return{error: "The User Already Exists"};
    }*/
    const ID = await ctx.stub.createCompositeKey(pubkey, [attribute]);
    console.log(ID);

    const ACL = {
      ID: ID,
      Attribute: attribute,
      Provider: provider,
      Availability: availability
    }
    await ctx.stub.putState(ID, Buffer.from(stringify(ACL)));
    return { success:"OK"};
  }

  async ReadACL(ctx, pubkey) {
    const buffer = await ctx.stub.getState(pubkey);
    if (!buffer || !buffer.length) return { error: "NOT_FOUND" };
    return { success: buffer.toString() };
  }

  async PubkeyExists(ctx, pubkey) {
        const assetJSON = await ctx.stub.getState(pubkey);
        return assetJSON && assetJSON.length > 0;
  }
  
  async UpdateACL(ctx, pubkey, attribute, provider, availability){
    const UpdateACL = {
      ID: pubkey,
      Attribute: attribute,
      Provider: provider,
      Availability: availability,
    };
    return ctx.stub.putState(pubkey, Buffer.from(stringify(UpdateACL)));
  }
  
  async GetAllACL(ctx){
	const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
  }
}

exports.contracts = [KVContract];
