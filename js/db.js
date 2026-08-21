const NAME='LIFEBOARD_DB',VERSION=1;
const schema={tasks:[['status','status'],['dueDate','dueDate'],['priority','priority'],['category','category']],events:[['date','date'],['category','category']],transactions:[['date','date'],['type','type'],['category','category']],notes:[['updatedAt','updatedAt'],['pinned','pinned']],settings:[]};
let connection;
const reqPromise=req=>new Promise((resolve,reject)=>{req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)});
const txDone=tx=>new Promise((resolve,reject)=>{tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error)});
export const db={
 async init(){if(connection)return connection;connection=await new Promise((resolve,reject)=>{const r=indexedDB.open(NAME,VERSION);r.onupgradeneeded=()=>{const d=r.result;for(const [name,indexes] of Object.entries(schema)){const s=d.objectStoreNames.contains(name)?r.transaction.objectStore(name):d.createObjectStore(name,{keyPath:'id'});for(const [index,path] of indexes)if(!s.indexNames.contains(index))s.createIndex(index,path,{unique:false})}};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)});connection.onversionchange=()=>connection.close();return connection},
 store(name,mode='readonly'){if(!schema[name])throw new Error('Invalid store');return connection.transaction(name,mode).objectStore(name)},
 async add(name,data){return reqPromise(this.store(name,'readwrite').add(data))},async get(name,id){return reqPromise(this.store(name).get(id))},async getAll(name){return reqPromise(this.store(name).getAll())},
 async update(name,data){return reqPromise(this.store(name,'readwrite').put(data))},async delete(name,id){return reqPromise(this.store(name,'readwrite').delete(id))},async clear(name){return reqPromise(this.store(name,'readwrite').clear())},
 async query(name,{index,value,range,direction='next',limit=0,filter}={}){const s=this.store(name);const src=index?s.index(index):s;const out=[];await new Promise((resolve,reject)=>{const r=src.openCursor(range||value,direction);r.onerror=()=>reject(r.error);r.onsuccess=()=>{const c=r.result;if(!c||limit&&out.length>=limit)return resolve();if(!filter||filter(c.value))out.push(c.value);c.continue()}});return out},
 async replaceAll(payload){const names=Object.keys(schema);const tx=connection.transaction(names,'readwrite');for(const name of names){const s=tx.objectStore(name);s.clear();for(const item of payload[name]||[])s.put(item)}return txDone(tx)},
 async mergeAll(payload){const names=Object.keys(schema);const tx=connection.transaction(names,'readwrite');for(const name of names)for(const item of payload[name]||[])tx.objectStore(name).put(item);return txDone(tx)}
};
export const STORE_NAMES=Object.keys(schema);
