# Longer Solana/Anchor example 

Expanding my knowledge of the Solana & Anchor frameworks with a more involved example. I came across a tutorial that 
has a lot of what I am looking to do so may as well give it a shot. This

https://dev.to/dabit3/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291

Ran into an issue when trying to get the React app to work. Some of it is detailed in the Github issue 
https://github.com/solana-labs/wallet-adapter/issues/231 

I fixed my issue 2 fold in package.json

1. changed `react-scripts: 4.0.3` (was at `5.0.0`)
2. Updated whatever was in here with
``` json
  "browserslist": {
    "production": [
      "defaults"
    ],
    "development": [
      "defaults"
    ]
  }
```


