import { Signer, BytesLike, ContractFactory, PayableOverrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { BeaconProxy, BeaconProxyInterface } from "../BeaconProxy";
export declare class BeaconProxy__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(beacon: string, data: BytesLike, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<BeaconProxy>;
    getDeployTransaction(beacon: string, data: BytesLike, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): BeaconProxy;
    connect(signer: Signer): BeaconProxy__factory;
    static readonly bytecode = "0x608060405260405161092f38038061092f83398101604081905261002291610453565b61002e82826000610035565b50506105a0565b61003e8361010f565b6040516001600160a01b038416907f1cf3b03a6cf19fa2baba4df148e9dcabedea7f8a5c07840e207e5c089be95d3e90600090a260008251118061007f5750805b1561010a57610108836001600160a01b0316635c60da1b6040518163ffffffff1660e01b815260040160206040518083038186803b1580156100c057600080fd5b505afa1580156100d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100f89190610439565b836102c160201b6100291760201c565b505b505050565b610122816102ed60201b6100551760201c565b6101815760405162461bcd60e51b815260206004820152602560248201527f455243313936373a206e657720626561636f6e206973206e6f74206120636f6e6044820152641d1c9858dd60da1b60648201526084015b60405180910390fd5b610204816001600160a01b0316635c60da1b6040518163ffffffff1660e01b815260040160206040518083038186803b1580156101bd57600080fd5b505afa1580156101d1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101f59190610439565b6102ed60201b6100551760201c565b6102695760405162461bcd60e51b815260206004820152603060248201527f455243313936373a20626561636f6e20696d706c656d656e746174696f6e206960448201526f1cc81b9bdd08184818dbdb9d1c9858dd60821b6064820152608401610178565b806102a07fa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d5060001b61030060201b6100641760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b60606102e6838360405180606001604052806027815260200161090860279139610303565b9392505050565b6001600160a01b0381163b15155b919050565b90565b6060600080856001600160a01b031685604051610320919061050f565b600060405180830381855af49150503d806000811461035b576040519150601f19603f3d011682016040523d82523d6000602084013e610360565b606091505b5090925090506103728683838761037c565b9695505050505050565b606083156103e65782516103df57610393856102ed565b6103df5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610178565b50816103f0565b6103f083836103f8565b949350505050565b8151156104085781518083602001fd5b8060405162461bcd60e51b8152600401610178919061052b565b80516001600160a01b03811681146102fb57600080fd5b60006020828403121561044a578081fd5b6102e682610422565b60008060408385031215610465578081fd5b61046e83610422565b60208401519092506001600160401b038082111561048a578283fd5b818501915085601f83011261049d578283fd5b8151818111156104af576104af61058a565b604051601f8201601f19908116603f011681019083821181831017156104d7576104d761058a565b816040528281528860208487010111156104ef578586fd5b61050083602083016020880161055e565b80955050505050509250929050565b6000825161052181846020870161055e565b9190910192915050565b600060208252825180602084015261054a81604085016020870161055e565b601f01601f19169190910160400192915050565b60005b83811015610579578181015183820152602001610561565b838111156101085750506000910152565b634e487b7160e01b600052604160045260246000fd5b610359806105af6000396000f3fe60806040523661001357610011610017565b005b6100115b610027610022610067565b61010f565b565b606061004e83836040518060600160405280602781526020016102fd60279139610133565b9392505050565b6001600160a01b03163b151590565b90565b600061009a7fa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50546001600160a01b031690565b6001600160a01b0316635c60da1b6040518163ffffffff1660e01b815260040160206040518083038186803b1580156100d257600080fd5b505afa1580156100e6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061010a9190610256565b905090565b3660008037600080366000845af43d6000803e80801561012e573d6000f35b3d6000fd5b6060600080856001600160a01b031685604051610150919061027d565b600060405180830381855af49150503d806000811461018b576040519150601f19603f3d011682016040523d82523d6000602084013e610190565b606091505b50915091506101a1868383876101ab565b9695505050505050565b6060831561021a578251610213576101c285610055565b6102135760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064015b60405180910390fd5b5081610224565b610224838361022c565b949350505050565b81511561023c5781518083602001fd5b8060405162461bcd60e51b815260040161020a9190610299565b600060208284031215610267578081fd5b81516001600160a01b038116811461004e578182fd5b6000825161028f8184602087016102cc565b9190910192915050565b60006020825282518060208401526102b88160408501602087016102cc565b601f01601f19169190910160400192915050565b60005b838110156102e75781810151838201526020016102cf565b838111156102f6576000848401525b5050505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212204ee4a5feb32b83cfdac553f041156e79251819260b5d83c7772dbd367e462d6364736f6c63430008020033416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        name?: undefined;
    } | {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        stateMutability?: undefined;
    } | {
        stateMutability: string;
        type: string;
        inputs?: undefined;
        anonymous?: undefined;
        name?: undefined;
    })[];
    static createInterface(): BeaconProxyInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): BeaconProxy;
}
