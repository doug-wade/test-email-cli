_test-email-cli() {
  COMPREPLY=()
  local word="${COMP_WORDS[COMP_CWORD]}"

  local command="${COMP_WORDS[1]}"
  local completions="$(test-email-cli completions "$command")"
  COMPREPLY=( $(compgen -W "$completions" -- "$word") )
}

complete -F _test-email-cli test-email-cli
