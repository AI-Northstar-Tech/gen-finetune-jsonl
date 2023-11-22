import json
import tiktoken
import sys

def count_tokens_in_file(file_path):
  """
  Count the number of tokens in a JSONL file.

  Args:
    file_path (str): The path to the JSONL file.

  Returns:
    int: The total number of tokens in the file.
  """
  ctr = 0
  with open(file_path, "r") as f:
    for line in f:
      data = json.loads(line)
      enc = tiktoken.get_encoding("cl100k_base")
      for message in data['messages']:
        tokens = enc.encode(message['content'])
        ctr += len(tokens)
  return ctr

# Example usage: python count_tokens_in_file.py /path/to/file.jsonl
file_path = sys.argv[1]
token_count = count_tokens_in_file(file_path)
print(token_count)
