import Web3 from 'web3';
import IpfsAPI from 'ipfs-api';

import DwNS from '@dwns/core';
// var ipfs = new IpfsAPI(window.RegistrarConfig.ipfs);

const dwns = new DwNS(async () => {
  let ethereum, ipfs, from;
  ipfs = window.ipfs || new IpfsAPI(window.RegistrarConfig.ipfs);
  if (ipfs.enable) {
    ipfs = await ipfs.enable();
  }

  if (window.ethereum) {
    ethereum = window.ethereum;
    try { from = (await window.ethereum.enable())[0]; }
    catch (err) { console.log(err); }
  } else if (window.web3) {
    ethereum = window.web3.currentProvider;
    try { from = (await window.web3.accounts())[0]; }
    catch (err) { console.log(err); }
  }

  // ethereum = 'https://rinkeby.infura.io/v3/7957504f8e5e424ba2f175b633980dad';
  // ethereum = new window.Web3.providers.HttpProvider('http://127.0.0.1:7545');
  // from = '0x0000000000000000000000000000000000000000';

  return {ethereum, ipfs, from};
});

window.dwns = dwns;

export default dwns;

// import RecordLocatorFactory from '@dwns/record-locator';
// var RecordLocator = new RecordLocatorFactory({ ipfs: ipfs });

// const DwNS2 = {
//   ipfs: ipfs,
//   RecordLocator: RecordLocator,
//   async init() {
//     this.web3 = new Web3(Web3.givenProvider);
//     this.accounts = await this.web3.eth.getAccounts();
//     this.account = this.accounts[0].toLowerCase();

//     this.core = await new Core(this.web3, this.account).ready();
//     this.directory = this.core.directory;
//     this.registrar = this.core.registrar;
//     this.token = this.core.token;
//     this.foundry = this.core.foundry;
//     console.log('Current Account:', this.core.account);

//     return this.core;
//   },
//   getAccount(account) {
//     window.console.log(account);
//     return api.get(`/accounts/${account}`).then(res => res.data);
//   },
//   getCurrentAccount() {
//     return this.getAccount(this.core.account);
//   },
//   async getZoneInfo(id) {
//     if (Array.isArray(id)) {
//       var zones = [];
//       for (var i = 0; i < id.length; i++) {
//         var zone = await this.getZoneInfo(id[i]);
//         zone.id = zone.id.toNumber();
//         zone.parent = zone.parent.toNumber();
//         zones.push(zone);
//       }
//       return zones;
//     } else {
//       return this.directory.zoneInfo(id);
//     }
//   },
//   getRecord(rl) {
//     return RecordLocator.from(rl).ready().then(r => r.record);
//   },
//   async forgeZoneToken(id, name='', symbol='') {
//     var token = await this.directory.forgeZoneToken(id, name, symbol);
//     return token.info();
//   },
//   async mintZoneToken(addr, amount) {
//     var token = await this.core.zoneToken(addr);
//     if (token) {
//       return token.mint(this.account, amount);
//     } else {
//       return false;
//     }
//   },
//   async getTokenInfo(addr) {
//     var token = await this.core.zoneToken(addr);
//     if (token) {
//       var info = await token.info();
//       info.supply = info.supply.toNumber();
//       return info;
//     } else {
//       return false;
//     }
//   },
//   async getTokenInfoFor(addr, who) {
//     var token = await this.core.zoneToken(addr);
//     if (token) {
//       var info = await token.infoFor(who);
//       info.supply = info.supply.toNumber();
//       info.balance = info.balance.toNumber();
//       return info;
//     } else {
//       return false;
//     }
//   },
//   async openRegistration(id) {
//     await this.registrar.setCostInTokens(id, 10);
//     return this.registrar.openRegistration(id);
//   },
//   async getZoneDetails(id) {
//     var info = await this.getZoneInfo(id);
//     var token = await this.getTokenInfoFor(info.token, this.account);
//     var record = await this.getRecord(info.record);
//     var subzones = await this.getZoneInfo(info.subzones);

//     console.log('Subzones >>', subzones);

//     return {
//       info: info,
//       token: token,
//       record: record,
//       subzones: subzones
//     };
//   },
//   getSubZones(id) {
//     return api.get(`/zones/${id}/subzones`).then(res => res.data);
//   },
//   async createZone(addr, label) {
//     var token = await this.core.zoneToken(addr);
//     if (token) {
//       return token.send(this.registrar.address, 10, label);
//     } else {
//       return false;
//     }
//   },
//   updateRecord(id, record) {
//     return new RecordLocator('/ipfs', record).ready().then(recordLocator => {
//       this.directory.commitRecordLocator(id, recordLocator.toHex());
//     });
//   }
// };
