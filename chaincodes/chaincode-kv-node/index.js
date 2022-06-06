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
    const ACL = {
      ID: ID,
      Attribute: attribute,
      Provider: provider,
      Availability: availability
    }
    await ctx.stub.putState(ID, Buffer.from(stringify(ACL)));
    return { success:"ACL create succesfully" + ID};
  }

  async ReadACL(ctx, pubkey, attribute) {
    const results = await ctx.stub.getStateByPartialCompositeKeyWithPagination(pubkey, [attribute],1,undefined);
    //if (!results || !results.length) return { error: "NOT_FOUND"  + (!results.done)} ;
    //return { success: results.toString() };
    let iterator = results.iterator
    let result = await iterator.next();
    const value = Buffer.from(result.value.value.toString()).toString('utf8');
    return JSON.stringify(value)
  }

  /*async PubkeyExists(ctx, pubkey, attribute) {
        const results = await ctx.stub.getStateByPartialCompositeKeyWithPagination(pubkey, [attribute],1,undefined);
	let iterator = results.iterator
        let result = await iterator.next();
        const value = Buffer.from(result.value.value.toString()).toString('utf8');
	//const value = Buffer.from(result.value.value.toString()).toString('utf8');
        return value ;
  }*/
  
  async UpdateACL(ctx, pubkey, attribute, provider, availability){
    const ID = await ctx.stub.createCompositeKey(pubkey, [attribute]);
    const UpdateACL = {
      ID: ID,
      Attribute: attribute,
      Provider: provider,
      Availability: availability,
    };
    return ctx.stub.putState(ID, Buffer.from(stringify(UpdateACL)));
  }
  
  /*async GetAllACL(ctx){
	const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
	return iterator;
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
	const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
	return strValue;
        let record;   
        try {
	   record = JSON.parse(strValue);
        } catch (err) {
            console.log(err);
            record = strValue;
        }
        allResults.push(record);
	
	//return x;
        return JSON.stringify(allResults);
  }*/
}

exports.contracts = [KVContract];
