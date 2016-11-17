if [[ ! -o interactive ]]; then
    return
fi

compctl -K _test-email-cli test-email-cli

_test-email-cli() {
  local word words completions
  read -cA words
  word="${words[2]}"

  completions="$(example completions "${word}")"

  reply=("${(ps:\n:)completions}")
}
