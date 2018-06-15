# Casino Ethereum Roulette

A demo smart contract for roulette simulation. Players are able to bet on different numbers of the roulette, and if any of those numbers is rolled, the winnings are distributed to players. Definitely not ready for production, but can serve as a good example of how Solidity, Ethereum and Javascript can be used to create a distributed application.

## Getting Started

To start developing or using this app on a local machine, follow the instructions below. Make sure to have all prerequisites installed. Note: it can be a little tricky to properly setup the projects, as the versions of required tools and libraries constantly change.

### Prerequisites

* NodeJS
* Truffle
* Ganache-cli

### Installing

Download and install NodeJS backend Javascript runtime. Node will be used to download all required packages and tools for development.

For Windows users: <https://nodejs.org/en/download/>

For Linux users: <https://nodejs.org/en/download/package-manager/>

Install truffle framework globally. We will use truffle to manage our project structure, compile smart contracts and deploy them to test environment. Run the following command:

```bash
npm install -g truffle
```

Install Ganache-cli globally. Ganache is a tool for simulating blockchain environment for development purposes. Ganache-cli is justa a CLI wrapper, which we will use to monitor our blockchain. For more info visit <http://truffleframework.com/ganache/>. Run the following command:

```bash
npm install -g ganache-cli
```

If there are problems with installing ganache-cli on some systems, try to fix it by installing its dependencies globally (not recommended otherwise), like webpack.

```bash
npm install -g webpack
```

To check if the tools are properly installed, run:

```bash
truffle --version
ganache-cli --version
```

To deploy smart contracts to the ganache-cli test blockchain environment, first we have to start it by running the following command:

```bash
ganache-cli
```

Running ganache-cli will provide us with 10 accounts that we can use for testing and playing around, like this:

```bash
Ganache CLI v6.1.0 (ganache-core: 2.1.0)

Available Accounts
==================
(0) 0x5bce6418e4544f8fb5f0318378a9338baabf70a6
(1) 0x4526bccc259c86c571f25360555a0781a6c119c8
(2) 0xa7ac4de94e11998bceb1eaf1da782daf49a345be
(3) 0xe02c19d686c6ada9009222b7f3b21fc2d0223325
(4) 0x78c868e32e5aeac71420f9dffed07ecaea574e8a
(5) 0x9bcf6bb1dda8738de5c1e23cdb50305b5e33eff0
(6) 0xc8c8dc0f270ed110acbe9cb84b54ab0004992758
(7) 0x4b7f653f229a87f8150f33da2dd5fb6c2fc447df
(8) 0x21ae3da7872d09b37869241f02ba91d3b890ca94
(9) 0xaab84318ed02384c0d6760b31a0396bf9ebf2b26
```

Note: Optional flag '-l' can be used to specify block gas limit (in case the transactions don't go through because of transaction costs).

Then, we have to compile smart contracts and deploy them. Run the following commands in a separate terminal:

```bash
truffle compile
truffle migrate
```

After deploying the contracts to blockchain, truffle will provide the output address of the contract the blockchain, which we use to setup frontend (so Javascript code knows which contract to target with requests). The output looks something like this:

```bash
Deploying Migrations...
  ... 0x19bd01bbe569a238bb87ecb0ec7b6aeaf40e9edbc284abd5e6d00812ddbaae93
  Migrations: 0xa6064f737854812c92ffe0e7120de7b9545c2856
  Deploying Roulette...
  ... 0xc3422cfd0cb5e0bf8d18b0bf3f33814a6c2163303b915a771134a771c320010e
  Roulette: 0xbf1fff78f4ba08824caf90683f9bed485b1fbff6
Saving successful migration to network...
  ... 0x135b1a21acc0870ddd3a50f027aab290c922688b7dc6b38bd611a5512a6235ca
Saving artifacts...
Running migration: 2_constructor_migration.js
  Replacing Migrations...
  ... 0x0bb8f1f1ac5a1235755dd63c90cc1bfae7b8fcd3907e67aa6aba7340a7ed7c28
  Migrations: 0x9be229e75ce0429eca22e36350e4ff63a7a68c90
  Replacing Roulette...
  ... 0x88abe7edd9c981df66cfb36b4f7fe5bab838282dc933cfa00c108a3c8a31ab16
  Roulette: 0x8ed898f6645e235db2b201c556af379bb098bed4
Saving successful migration to network...
  ... 0xfbd5d97e48232bf6bcabc4935a1180a3543f8686b9a315fcc87e9f4546e95868
Saving artifacts...
```

Last migration output of 'Roulette' contract is what interests us:

```bash
Roulette: 0x8ed898f6645e235db2b201c556af379bb098bed4
```

We can use this address to access our contract through frontend Javascript API, or using the Remix IDE online. To change which address frontend communicates with, go to js/index.js and modify the following line (line 15 currently). Replace the string value with the above-generated address:

```javascript
var contractAddress = "INSERT CONTRACT ADDRESS";
```

Run the following commands to setup npm environment, build the frontend app and serve it over static local webserver:

```bash
npm install
npm run build
npm run server
```

The application is now available on localhost (default port 8080). Log in using one of the provided by ganache-cli.

Note: two functions (refill and getBalance) are not provided with an interface from frontend app. To use them, they must be accessed through Remix or other tools that can communicate with ganache-cli. It is recommended to us Remix for testing purposes.

Note: The contract must be refilled with ether to be able to provide payouts for customers.

## Testing

Automatic tests are not provided.

## Deployment

Deployment to production servers are not supported in this version.

## Authors

Biljana Andjelic - <https://github.com/biljanaandjelic>
Maksim Lalic - <https://github.com/LaMaksim>
Bojan Batalo - <https://github.com/bbatalo>