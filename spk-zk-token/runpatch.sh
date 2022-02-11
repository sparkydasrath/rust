if [[ ! -f solana/.zk-token-patched ]]; then
  git -C solana am "$PWD"/scripts/0001-feat-double-PACKET_DATA_SIZE.patch
  touch solana/.zk-token-patched
fi