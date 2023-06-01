import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { CoSoul, CoSoulInterface } from "../CoSoul";
export declare class CoSoul__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<CoSoul>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): CoSoul;
    connect(signer: Signer): CoSoul__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50612f87806100206000396000f3fe608060405234801561001057600080fd5b506004361061020c5760003560e01c8061c2fc146102115780628ffa061461022657806301ffc9a71461023957806306fdde0314610261578063077f224a14610276578063081812fc14610289578063095ea7b3146102b45780631249c58b146102c757806318160ddd146102cf57806318badae8146102e1578063238ac933146102f457806323b872dd146103075780632abc3d4e1461031a5780632f745c591461033b5780633007daae1461034e57806342842e0e1461030757806342966c68146103615780634eac19f8146103745780634f6ccce71461038757806355f804b31461039a57806361bc221a146103ad5780636352211e146103b75780636562f5f7146103ca5780636c19e783146103dd57806370a08231146103f0578063715018a6146104035780637a0f4de21461040b5780637c772c671461042b5780637ead60a61461044c5780638da5cb5b1461045f578063944fd180146104675780639540bce81461048a57806395d89b41146104ab5780639763d626146104b35780639e759355146104c65780639f118536146104d9578063a22cb465146104e6578063ae347105146104f9578063b88d4fde1461050c578063c87b56dd1461051a578063cde4a8fc1461052d578063d3f94a8714610540578063e985e9c514610561578063f2fde38b1461059d578063fc68c689146105b0575b600080fd5b61022461021f366004612995565b6105c3565b005b6102246102343660046128da565b610693565b61024c61024736600461295d565b61084d565b60405190151581526020015b60405180910390f35b61026961087a565b6040516102589190612c69565b6102246102843660046129c7565b61090c565b61029c610297366004612a37565b610a51565b6040516001600160a01b039091168152602001610258565b6102246102c23660046128b1565b610a78565b610224610b8e565b60cb545b604051908152602001610258565b6102246102ef366004612762565b610bc1565b60fd5461029c906001600160a01b031681565b610224610315366004612762565b610c1e565b6102d3610328366004612a37565b6101046020526000908152604090205481565b6102d36103493660046128b1565b610c4f565b6102d361035c366004612b84565b610ce5565b61022461036f366004612a37565b610d1b565b610224610382366004612b9f565b610d54565b6102d3610395366004612a37565b610e0c565b6102246103a8366004612995565b610ead565b6102d36101035481565b61029c6103c5366004612a37565b610ecc565b6102246103d8366004612877565b610f00565b6102246103eb366004612716565b610f33565b6102d36103fe366004612716565b610f5d565b610224610fe3565b6102d3610419366004612a37565b60ff6020526000908152604090205481565b6102d3610439366004612a37565b6101006020526000908152604090205481565b61022461045a366004612802565b610ff5565b61029c61114f565b61024c610475366004612716565b60fe6020526000908152604090205460ff1681565b6102d3610498366004612716565b6101026020526000908152604090205481565b61026961115e565b6102246104c1366004612a4f565b61116d565b6102246104d4366004612b9f565b611258565b60fb5461024c9060ff1681565b6102246104f4366004612877565b611302565b610224610507366004612ae8565b61130d565b61022461031536600461279d565b610269610528366004612a37565b6113fd565b61022461053b366004612b46565b611464565b6102d361054e366004612a37565b6101016020526000908152604090205481565b61024c61056f366004612730565b6001600160a01b039182166000908152609c6020908152604080832093909416825291909152205460ff1690565b6102246105ab366004612716565b6114db565b6102246105be366004612a98565b611551565b33600081815260fe602052604090205460ff16806105f957506105e461114f565b6001600160a01b0316816001600160a01b0316145b61060257600080fd5b6000600883516106129190612e36565b602084015190915060f81c600080805b8481101561068a57600881026021018088015160e01c93506004810188015160e01c925050610678848484600090815261010460205260409020805463ffffffff80851b1990911692811690931b909216179055565b8061068281612ed4565b915050610622565b50505050505050565b33600081815260fe602052604090205460ff16806106c957506106b461114f565b6001600160a01b0316816001600160a01b0316145b6106d257600080fd5b60005b868110156108435760088888838181106106ff57634e487b7160e01b600052603260045260246000fd5b905060200201351061071057600080fd5b6000610104600086868581811061073757634e487b7160e01b600052603260045260246000fd5b905060200201358152602001908152602001600020549050600089898481811061077157634e487b7160e01b600052603260045260246000fd5b9050602002013563ffffffff901b1990508989848181106107a257634e487b7160e01b600052603260045260246000fd5b905060200201358888858181106107c957634e487b7160e01b600052603260045260246000fd5b90506020020160208101906107de9190612b6a565b63ffffffff16901b63ffffffff1681831617610104600088888781811061081557634e487b7160e01b600052603260045260246000fd5b905060200201358152602001908152602001600020819055505050808061083b90612ed4565b9150506106d5565b5050505050505050565b60006001600160e01b0319821663780e9d6360e01b148061087257506108728261163e565b90505b919050565b60606097805461088990612e99565b80601f01602080910402602001604051908101604052809291908181526020018280546108b590612e99565b80156109025780601f106108d757610100808354040283529160200191610902565b820191906000526020600020905b8154815290600101906020018083116108e557829003601f168201915b5050505050905090565b600054610100900460ff161580801561092c5750600054600160ff909116105b8061094d575061093b3061168e565b15801561094d575060005460ff166001145b6109b55760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6000805460ff1916600117905580156109d8576000805461ff0019166101001790555b6109e061169d565b6109ea84846116cc565b60fd80546001600160a01b0319166001600160a01b0384161790558015610a4b576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050565b6000610a5c826116fd565b506000908152609b60205260409020546001600160a01b031690565b6000610a8382610ecc565b9050806001600160a01b0316836001600160a01b03161415610af15760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016109ac565b336001600160a01b0382161480610b0d5750610b0d813361056f565b610b7f5760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c00000060648201526084016109ac565b610b898383611722565b505050565b610b9733610f5d565b15610ba157600080fd5b610bbf3361010360008154610bb590612ed4565b9182905550611790565b565b33600081815260fe602052604090205460ff1680610bf75750610be261114f565b6001600160a01b0316816001600160a01b0316145b610c0057600080fd5b610c0983610f5d565b15610c1357600080fd5b610a4b8484846117aa565b60405162461bcd60e51b81526004016109ac906020808252600490820152636e6f706560e01b604082015260600190565b6000610c5a83610f5d565b8210610cbc5760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b60648201526084016109ac565b506001600160a01b0391909116600090815260c960209081526040808320938352929052205490565b600060088360ff1610610cf757600080fd5b506000908152610104602052604090205463ffffffff60ff90921691821b16901c90565b33610d2582610ecc565b6001600160a01b031614610d3857600080fd5b60008181526101046020526040812055610d5181611909565b50565b33600081815260fe602052604090205460ff1680610d8a5750610d7561114f565b6001600160a01b0316816001600160a01b0316145b610d9357600080fd5b60088460ff1610610da357600080fd5b6000610daf8584610ce5565b905083811015610dd15760405162461bcd60e51b81526004016109ac90612da2565b60008381526101046020526040902054610df160ff871686901b82612e56565b60009485526101046020526040909420939093555050505050565b6000610e1760cb5490565b8210610e7a5760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b60648201526084016109ac565b60cb8281548110610e9b57634e487b7160e01b600052603260045260246000fd5b90600052602060002001549050919050565b610eb561199b565b8051610ec89060fc90602084019061253b565b5050565b600080610ed8836119fa565b90506001600160a01b0381166108725760405162461bcd60e51b81526004016109ac90612d70565b610f0861199b565b6001600160a01b0391909116600090815260fe60205260409020805460ff1916911515919091179055565b610f3b61199b565b60fd80546001600160a01b0319166001600160a01b0392909216919091179055565b60006001600160a01b038216610fc75760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b60648201526084016109ac565b506001600160a01b03166000908152609a602052604090205490565b610feb61199b565b610bbf6000611a15565b33610fff85610ecc565b6001600160a01b03161461101257600080fd5b61101b85610f5d565b1561102557600080fd5b600084815260ff602052604081208054859290919061104383612ed4565b919050551461105157600080fd5b60fd54604080516020601f85018190048102820181019092528381526001600160a01b03909216916111169185908590819084018382808284376000920191909152505060408051602081018b9052908101899052611110925060600190505b60408051601f1981840301815282825280516020918201207b0ca2ba3432b932bab69029b4b3b732b21026b2b9b9b0b3b29d05199960211b84830152603c8085019190915282518085039091018152605c909301909152815191012090565b90611a67565b6001600160a01b03161461113c5760405162461bcd60e51b81526004016109ac90612d49565b6111478686866117aa565b505050505050565b6033546001600160a01b031690565b60606098805461088990612e99565b61117633610f5d565b1561118057600080fd5b33600090815261010260205260408120805485929091906111a083612ed4565b91905055146111ae57600080fd5b60fd54604080516020601f85018190048102820181019092528381526001600160a01b039092169161121e918590859081908401838280828437600092019190915250506040516001600160601b03193360601b16602082015260348101899052611110925060540190506110b1565b6001600160a01b0316146112445760405162461bcd60e51b81526004016109ac90612d49565b610b893361010360008154610bb590612ed4565b33600081815260fe602052604090205460ff168061128e575061127961114f565b6001600160a01b0316816001600160a01b0316145b61129757600080fd5b60088460ff16106112a757600080fd5b60006112b38584610ce5565b905063ffffffff6112c48583612e1e565b11156112e25760405162461bcd60e51b81526004016109ac90612da2565b60008381526101046020526040902054610df160ff871686901b82612e1e565b610ec8338383611a8b565b3361131785610ecc565b6001600160a01b03161461132a57600080fd5b6000838152610100602052604081208054859290919061134983612ed4565b919050551461135757600080fd5b60fd54604080516020601f85018190048102820181019092528381526001600160a01b03909216916113c29185908590819084018382808284376000920191909152505060408051602081018b9052908101899052606081018b9052611110925060800190506110b1565b6001600160a01b0316146113e85760405162461bcd60e51b81526004016109ac90612d49565b50505060009081526101046020526040902055565b6060611408826116fd565b6000611412611b56565b90506000815111611432576040518060200160405280600081525061145d565b8061143c84611b65565b60405160200161144d929190612bfd565b6040516020818303038152906040525b9392505050565b33600081815260fe602052604090205460ff168061149a575061148561114f565b6001600160a01b0316816001600160a01b0316145b6114a357600080fd5b600884106114b057600080fd5b50600090815261010460205260409020805463ffffffff928316841b83169290931b19909216179055565b6114e361199b565b6001600160a01b0381166115485760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016109ac565b610d5181611a15565b3361155b85610ecc565b6001600160a01b03161461156e57600080fd5b6000848152610101602052604081208054859290919061158d83612ed4565b919050551461159b57600080fd5b60fd54604080516020601f85018190048102820181019092528381526001600160a01b03909216916115ff9185908590819084018382808284376000920191909152505060408051602081018b9052908101899052611110925060600190506110b1565b6001600160a01b0316146116255760405162461bcd60e51b81526004016109ac90612d49565b60008481526101046020526040812055610a4b84611909565b60006001600160e01b031982166380ac58cd60e01b148061166f57506001600160e01b03198216635b5e139f60e01b145b8061087257506301ffc9a760e01b6001600160e01b0319831614610872565b6001600160a01b03163b151590565b600054610100900460ff166116c45760405162461bcd60e51b81526004016109ac90612dd3565b610bbf611c07565b600054610100900460ff166116f35760405162461bcd60e51b81526004016109ac90612dd3565b610ec88282611c37565b61170681611c85565b610d515760405162461bcd60e51b81526004016109ac90612d70565b6000818152609b6020526040902080546001600160a01b0319166001600160a01b038416908117909155819061175782610ecc565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b610ec8828260405180602001604052806000815250611ca2565b826001600160a01b03166117bd82610ecc565b6001600160a01b0316146117e35760405162461bcd60e51b81526004016109ac90612cce565b6001600160a01b0382166118455760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016109ac565b6118528383836001611cd5565b826001600160a01b031661186582610ecc565b6001600160a01b03161461188b5760405162461bcd60e51b81526004016109ac90612cce565b6000818152609b6020908152604080832080546001600160a01b03199081169091556001600160a01b03878116808652609a855283862080546000190190559087168086528386208054600101905586865260999094528285208054909216841790915590518493600080516020612f3283398151915291a4610b89565b600061191482610ecc565b9050611924816000846001611cd5565b61192d82610ecc565b6000838152609b6020908152604080832080546001600160a01b03199081169091556001600160a01b038516808552609a84528285208054600019019055878552609990935281842080549091169055519293508492600080516020612f32833981519152908390a4610ec8565b336119a461114f565b6001600160a01b031614610bbf5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016109ac565b6000908152609960205260409020546001600160a01b031690565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000806000611a768585611e09565b91509150611a8381611e4f565b509392505050565b816001600160a01b0316836001600160a01b03161415611ae95760405162461bcd60e51b815260206004820152601960248201527822a9219b99189d1030b8383937bb32903a379031b0b63632b960391b60448201526064016109ac565b6001600160a01b038381166000818152609c6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b606060fc805461088990612e99565b60606000611b7283611fd2565b60010190506000816001600160401b03811115611b9f57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015611bc9576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a8504945084611c0257611a83565b611bd3565b600054610100900460ff16611c2e5760405162461bcd60e51b81526004016109ac90612dd3565b610bbf33611a15565b600054610100900460ff16611c5e5760405162461bcd60e51b81526004016109ac90612dd3565b8151611c7190609790602085019061253b565b508051610b8990609890602084019061253b565b600080611c91836119fa565b6001600160a01b0316141592915050565b611cac83836120a8565b611cb960008484846121b2565b610b895760405162461bcd60e51b81526004016109ac90612c7c565b6001811115611d445760405162461bcd60e51b815260206004820152603560248201527f455243373231456e756d657261626c653a20636f6e7365637574697665207472604482015274185b9cd9995c9cc81b9bdd081cdd5c1c1bdc9d1959605a1b60648201526084016109ac565b816001600160a01b038516611da057611d9b8160cb8054600083815260cc60205260408120829055600182018355919091527fa7ce836d032b2bf62b7e2097a8e0a6d8aeb35405ad15271e96d3b0188a1d06fb0155565b611dc3565b836001600160a01b0316856001600160a01b031614611dc357611dc385826122c7565b6001600160a01b038416611ddf57611dda81612364565b611e02565b846001600160a01b0316846001600160a01b031614611e0257611e02848261243d565b5050505050565b600080825160411415611e405760208301516040840151606085015160001a611e3487828585612481565b94509450505050611e48565b506000905060025b9250929050565b6000816004811115611e7157634e487b7160e01b600052602160045260246000fd5b1415611e7c57610d51565b6001816004811115611e9e57634e487b7160e01b600052602160045260246000fd5b1415611ee75760405162461bcd60e51b815260206004820152601860248201527745434453413a20696e76616c6964207369676e617475726560401b60448201526064016109ac565b6002816004811115611f0957634e487b7160e01b600052602160045260246000fd5b1415611f575760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016109ac565b6003816004811115611f7957634e487b7160e01b600052602160045260246000fd5b1415610d515760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b60648201526084016109ac565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b83106120115772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6904ee2d6d415b85acef8160201b831061203b576904ee2d6d415b85acef8160201b830492506020015b662386f26fc10000831061205957662386f26fc10000830492506010015b6305f5e1008310612071576305f5e100830492506008015b612710831061208557612710830492506004015b60648310612097576064830492506002015b600a83106108725760010192915050565b6001600160a01b0382166120fe5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016109ac565b61210781611c85565b156121245760405162461bcd60e51b81526004016109ac90612d13565b612132600083836001611cd5565b61213b81611c85565b156121585760405162461bcd60e51b81526004016109ac90612d13565b6001600160a01b0382166000818152609a6020908152604080832080546001019055848352609990915280822080546001600160a01b031916841790555183929190600080516020612f32833981519152908290a4610ec8565b60006121c6846001600160a01b031661168e565b156122bb57604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906121fd903390899088908890600401612c2c565b602060405180830381600087803b15801561221757600080fd5b505af1925050508015612247575060408051601f3d908101601f1916820190925261224491810190612979565b60015b6122a1573d808015612275576040519150601f19603f3d011682016040523d82523d6000602084013e61227a565b606091505b5080516122995760405162461bcd60e51b81526004016109ac90612c7c565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506122bf565b5060015b949350505050565b600060016122d484610f5d565b6122de9190612e56565b600083815260ca6020526040902054909150808214612331576001600160a01b038416600090815260c960209081526040808320858452825280832054848452818420819055835260ca90915290208190555b50600091825260ca602090815260408084208490556001600160a01b03909416835260c981528383209183525290812055565b60cb5460009061237690600190612e56565b600083815260cc602052604081205460cb80549394509092849081106123ac57634e487b7160e01b600052603260045260246000fd5b906000526020600020015490508060cb83815481106123db57634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260cc909152604080822084905585825281205560cb80548061242157634e487b7160e01b600052603160045260246000fd5b6001900381819060005260206000200160009055905550505050565b600061244883610f5d565b6001600160a01b03909316600090815260c960209081526040808320868452825280832085905593825260ca9052919091209190915550565b6000806fa2a8918ca85bafe22016d0b997e4df60600160ff1b038311156124ae5750600090506003612532565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015612502573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661252b57600060019250925050612532565b9150600090505b94509492505050565b82805461254790612e99565b90600052602060002090601f01602090048101928261256957600085556125af565b82601f1061258257805160ff19168380011785556125af565b828001600101855582156125af579182015b828111156125af578251825591602001919060010190612594565b506125bb9291506125bf565b5090565b5b808211156125bb57600081556001016125c0565b80356001600160a01b038116811461087557600080fd5b60008083601f8401126125fc578081fd5b5081356001600160401b03811115612612578182fd5b6020830191508360208083028501011115611e4857600080fd5b60008083601f84011261263d578182fd5b5081356001600160401b03811115612653578182fd5b602083019150836020828501011115611e4857600080fd5b600082601f83011261267b578081fd5b81356001600160401b038082111561269557612695612f05565b604051601f8301601f19908116603f011681019082821181831017156126bd576126bd612f05565b816040528381528660208588010111156126d5578485fd5b8360208701602083013792830160200193909352509392505050565b803563ffffffff8116811461087557600080fd5b803560ff8116811461087557600080fd5b600060208284031215612727578081fd5b61145d826125d4565b60008060408385031215612742578081fd5b61274b836125d4565b9150612759602084016125d4565b90509250929050565b600080600060608486031215612776578081fd5b61277f846125d4565b925061278d602085016125d4565b9150604084013590509250925092565b600080600080608085870312156127b2578081fd5b6127bb856125d4565b93506127c9602086016125d4565b92506040850135915060608501356001600160401b038111156127ea578182fd5b6127f68782880161266b565b91505092959194509250565b60008060008060008060a0878903121561281a578182fd5b612823876125d4565b9550612831602088016125d4565b9450604087013593506060870135925060808701356001600160401b03811115612859578283fd5b61286589828a0161262c565b979a9699509497509295939492505050565b60008060408385031215612889578182fd5b612892836125d4565b9150602083013580151581146128a6578182fd5b809150509250929050565b600080604083850312156128c3578182fd5b6128cc836125d4565b946020939093013593505050565b600080600080600080606087890312156128f2578182fd5b86356001600160401b0380821115612908578384fd5b6129148a838b016125eb565b9098509650602089013591508082111561292c578384fd5b6129388a838b016125eb565b90965094506040890135915080821115612950578384fd5b5061286589828a016125eb565b60006020828403121561296e578081fd5b813561145d81612f1b565b60006020828403121561298a578081fd5b815161145d81612f1b565b6000602082840312156129a6578081fd5b81356001600160401b038111156129bb578182fd5b6122bf8482850161266b565b6000806000606084860312156129db578081fd5b83356001600160401b03808211156129f1578283fd5b6129fd8783880161266b565b94506020860135915080821115612a12578283fd5b50612a1f8682870161266b565b925050612a2e604085016125d4565b90509250925092565b600060208284031215612a48578081fd5b5035919050565b600080600060408486031215612a63578081fd5b8335925060208401356001600160401b03811115612a7f578182fd5b612a8b8682870161262c565b9497909650939450505050565b60008060008060608587031215612aad578182fd5b843593506020850135925060408501356001600160401b03811115612ad0578283fd5b612adc8782880161262c565b95989497509550505050565b600080600080600060808688031215612aff578283fd5b85359450602086013593506040860135925060608601356001600160401b03811115612b29578182fd5b612b358882890161262c565b969995985093965092949392505050565b600080600060608486031215612b5a578081fd5b8335925061278d602085016126f1565b600060208284031215612b7b578081fd5b61145d826126f1565b60008060408385031215612b96578182fd5b6128cc83612705565b600080600060608486031215612bb3578081fd5b612bbc84612705565b95602085013595506040909401359392505050565b60008151808452612be9816020860160208601612e6d565b601f01601f19169290920160200192915050565b60008351612c0f818460208801612e6d565b835190830190612c23818360208801612e6d565b01949350505050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090612c5f90830184612bd1565b9695505050505050565b60006020825261145d6020830184612bd1565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60208082526025908201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201526437bbb732b960d91b606082015260800190565b6020808252601c908201527b115490cdcc8c4e881d1bdad95b88185b1c9958591e481b5a5b9d195960221b604082015260600190565b6020808252600d908201526c14da59c81b9bdd081d985b1a59609a1b604082015260600190565b602080825260189082015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604082015260600190565b602080825260179082015276436f536f756c3a2075696e743332206f766572666c6f7760481b604082015260600190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60008219821115612e3157612e31612eef565b500190565b600082612e5157634e487b7160e01b81526012600452602481fd5b500490565b600082821015612e6857612e68612eef565b500390565b60005b83811015612e88578181015183820152602001612e70565b83811115610a4b5750506000910152565b600281046001821680612ead57607f821691505b60208210811415612ece57634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415612ee857612ee8612eef565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b031981168114610d5157600080fdfeddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa2646970667358221220dd4c80da52409b668dea2fdc2412be679943b08d208d1d0655e6ccbf965fb78a64736f6c63430008020033";
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): CoSoulInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): CoSoul;
}
