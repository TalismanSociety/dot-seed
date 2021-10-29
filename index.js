const { mnemonicGenerate, mnemonicValidate} = require("@polkadot/util-crypto");
const passworder = require("browser-passworder");

document.addEventListener('DOMContentLoaded', () => {

    const mnemonic = mnemonicGenerate(12, false);
    document.getElementById("mnemonic").innerText = "mnemonic: " + mnemonic;
    document.getElementById("valid").innerText = "valid mnemonic: " + mnemonicValidate(mnemonic);

    const obj = {
        type: 'HD Key Tree',
        data: {
            mnemonic: mnemonic,
            numberOfAccounts: 1,
            hdPath: null,
        }
    };
    const password = "password";
    passworder
        .encrypt(password, obj)
        .then(function (blob) {
            document.getElementById("encrypted").innerText = "Encrypted: " + blob;
            return passworder.decrypt(password, blob);
        })
        .then(function (result) {
            document.getElementById("decrypted").innerText = "Decrypted: " + JSON.stringify(result);
        });

})

// return this.addNewKeyring('HD Key Tree', {
//     mnemonic: seed,
//     numberOfAccounts: 1,
// })
// https://github.com/MetaMask/eth-hd-keyring/blob/main/index.js
// keyring type for metamask. we have a different path deriveration

// this.password = password
// return Promise.all(this.keyrings.map((keyring) => {
//     return Promise.all([keyring.type, keyring.serialize()])
//         .then((serializedKeyringArray) => {
//             // Label the output values on each serialized Keyring:
//             return {
//                 type: serializedKeyringArray[0],
//                 data: serializedKeyringArray[1],
//             }
//         })
// }))
//     .then((serializedKeyrings) => {
//         return this.encryptor.encrypt(this.password, serializedKeyrings)
//     })
//     .then((encryptedString) => {
//         this.store.updateState({ vault: encryptedString })
//         return true
//     })
// }

// serialize() {
//     return Promise.resolve({
//         mnemonic: this.mnemonic,
//         numberOfAccounts: this.wallets.length,
//         hdPath: this.hdPath,
//     });
// }