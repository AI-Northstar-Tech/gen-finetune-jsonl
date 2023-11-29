# combine all files in current directory starting with openai-ft-* into one file
# openai-ft-all.txt

import os
import sys
import glob

# take in root folder path optionally from command line argv[1]
root_folder = os.getcwd()
if len(sys.argv) > 1:
    root_folder = sys.argv[1]

# accept optional argument for output file name
output_file_name = "openai-ft-all.txt"
if len(sys.argv) > 2:
    output_file_name = sys.argv[2]

# get all files in current directory starting with openai-ft-*
# handle case if root_folder is ~/ or ~
read_files = glob.glob(os.path.join(root_folder, "openai-ft-*"))

# combine all files in the list into one file separated by newline using .read() and .join(). there should be no empty lines in the file
file_content = "\n".join([open(f, "r").read() for f in read_files])

# write the file
with open(output_file_name, "w") as f:
    f.write(file_content)