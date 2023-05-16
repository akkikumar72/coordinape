"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultProxy__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_apeBeacon",
                type: "address",
            },
            {
                internalType: "address",
                name: "_owner",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address",
            },
        ],
        name: "AdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "beacon",
                type: "address",
            },
        ],
        name: "BeaconUpgraded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "ProxyOwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address",
            },
        ],
        name: "Upgraded",
        type: "event",
    },
    {
        stateMutability: "payable",
        type: "fallback",
    },
    {
        inputs: [],
        name: "proxyOwner",
        outputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_value",
                type: "uint256",
            },
        ],
        name: "setBeaconDeploymentPrefs",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_newOwner",
                type: "address",
            },
        ],
        name: "transferProxyOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
];
const _bytecode = "0x60806040523480156200001157600080fd5b5060405162000c8c38038062000c8c83398101604081905262000034916200050b565b82816200004482826000620000b9565b5062000074905060017fa7b53796fd2d99cb1f5ae019b54f9e024446c3d12b483f733ccc62ed04eb126b6200063a565b60008051602062000c4583398151915214620000a057634e487b7160e01b600052600160045260246000fd5b5060008051602062000c458339815191525550620006a3565b620000c4836200019e565b6040516001600160a01b038416907f1cf3b03a6cf19fa2baba4df148e9dcabedea7f8a5c07840e207e5c089be95d3e90600090a2600082511180620001065750805b15620001995762000197836001600160a01b0316635c60da1b6040518163ffffffff1660e01b815260040160206040518083038186803b1580156200014a57600080fd5b505afa1580156200015f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620001859190620004ee565b836200036060201b620001de1760201c565b505b505050565b620001b4816200038f60201b6200020a1760201c565b620002145760405162461bcd60e51b815260206004820152602560248201527f455243313936373a206e657720626561636f6e206973206e6f74206120636f6e6044820152641d1c9858dd60da1b60648201526084015b60405180910390fd5b6200029e816001600160a01b0316635c60da1b6040518163ffffffff1660e01b815260040160206040518083038186803b1580156200025257600080fd5b505afa15801562000267573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200028d9190620004ee565b6200038f60201b6200020a1760201c565b620003055760405162461bcd60e51b815260206004820152603060248201527f455243313936373a20626561636f6e20696d706c656d656e746174696f6e206960448201526f1cc81b9bdd08184818dbdb9d1c9858dd60821b60648201526084016200020b565b806200033f7fa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d5060001b620003a260201b620002191760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b606062000388838360405180606001604052806027815260200162000c6560279139620003a5565b9392505050565b6001600160a01b0381163b15155b919050565b90565b6060600080856001600160a01b031685604051620003c49190620005e7565b600060405180830381855af49150503d806000811462000401576040519150601f19603f3d011682016040523d82523d6000602084013e62000406565b606091505b5090925090506200041a8683838762000424565b9695505050505050565b60608315620004955782516200048d576200043f856200038f565b6200048d5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016200020b565b5081620004a1565b620004a18383620004a9565b949350505050565b815115620004ba5781518083602001fd5b8060405162461bcd60e51b81526004016200020b919062000605565b80516001600160a01b03811681146200039d57600080fd5b60006020828403121562000500578081fd5b6200038882620004d6565b60008060006060848603121562000520578182fd5b6200052b84620004d6565b92506200053b60208501620004d6565b60408501519092506001600160401b038082111562000558578283fd5b818601915086601f8301126200056c578283fd5b8151818111156200058157620005816200068d565b604051601f8201601f19908116603f01168101908382118183101715620005ac57620005ac6200068d565b81604052828152896020848701011115620005c5578586fd5b620005d88360208301602088016200065e565b80955050505050509250925092565b60008251620005fb8184602087016200065e565b9190910192915050565b6000602082528251806020840152620006268160408501602087016200065e565b601f01601f19169190910160400192915050565b6000828210156200065957634e487b7160e01b81526011600452602481fd5b500390565b60005b838110156200067b57818101518382015260200162000661565b83811115620001975750506000910152565b634e487b7160e01b600052604160045260246000fd5b61059280620006b36000396000f3fe6080604052600436106100385760003560e01c8063025313a21461004f578063bf8cab431461007a578063f1739cae1461009a57610047565b36610047576100456100ba565b005b6100456100ba565b34801561005b57600080fd5b506100646100cc565b6040516100719190610486565b60405180910390f35b34801561008657600080fd5b50610045610095366004610452565b6100df565b3480156100a657600080fd5b506100456100b536600461041a565b61016e565b6100ca6100c561021c565b61029b565b565b6000805160206105168339815191525490565b6100e76100cc565b6001600160a01b0316336001600160a01b03161461010457600080fd5b61010c6102bf565b6001600160a01b03166329e84949826040518263ffffffff1660e01b815260040161013991815260200190565b600060405180830381600087803b15801561015357600080fd5b505af1158015610167573d6000803e3d6000fd5b5050505050565b6101766100cc565b6001600160a01b0316336001600160a01b03161461019357600080fd5b80600080516020610516833981519152557fc9c890d47f12a6629d03fbfa332f5be9e2ae8310dfc4421ac03a7a9082e24aae816040516101d39190610486565b60405180910390a150565b60606102038383604051806060016040528060278152602001610536602791396102c9565b9392505050565b6001600160a01b03163b151590565b90565b6000610226610341565b6001600160a01b0316635c60da1b6040518163ffffffff1660e01b815260040160206040518083038186803b15801561025e57600080fd5b505afa158015610272573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102969190610436565b905090565b3660008037600080366000845af43d6000803e8080156102ba573d6000f35b3d6000fd5b6000610296610341565b6060600080856001600160a01b0316856040516102e6919061046a565b600060405180830381855af49150503d8060008114610321576040519150601f19603f3d011682016040523d82523d6000602084013e610326565b606091505b50915091506103378683838761036f565b9695505050505050565b7fa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50546001600160a01b031690565b606083156103de5782516103d7576103868561020a565b6103d75760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064015b60405180910390fd5b50816103e8565b6103e883836103f0565b949350505050565b8151156104005781518083602001fd5b8060405162461bcd60e51b81526004016103ce919061049a565b60006020828403121561042b578081fd5b8135610203816104fd565b600060208284031215610447578081fd5b8151610203816104fd565b600060208284031215610463578081fd5b5035919050565b6000825161047c8184602087016104cd565b9190910192915050565b6001600160a01b0391909116815260200190565b60006020825282518060208401526104b98160408501602087016104cd565b601f01601f19169190910160400192915050565b60005b838110156104e85781810151838201526020016104d0565b838111156104f7576000848401525b50505050565b6001600160a01b038116811461051257600080fd5b5056fea7b53796fd2d99cb1f5ae019b54f9e024446c3d12b483f733ccc62ed04eb126a416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220af25b0dd5857909621ed2f4d4df20ec50f87689160b23479444f5e00ddff3d0a64736f6c63430008020033a7b53796fd2d99cb1f5ae019b54f9e024446c3d12b483f733ccc62ed04eb126a416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564";
class VaultProxy__factory extends ethers_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(_apeBeacon, _owner, data, overrides) {
        return super.deploy(_apeBeacon, _owner, data, overrides || {});
    }
    getDeployTransaction(_apeBeacon, _owner, data, overrides) {
        return super.getDeployTransaction(_apeBeacon, _owner, data, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.VaultProxy__factory = VaultProxy__factory;
VaultProxy__factory.bytecode = _bytecode;
VaultProxy__factory.abi = _abi;
