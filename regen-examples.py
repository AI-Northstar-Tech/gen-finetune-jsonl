import json
import os
import sys
import glob

# take in root folder path optionally from command line argv[1]
root_folder = os.getcwd()
if len(sys.argv) > 1:
    root_folder = sys.argv[1]

read_files = glob.glob(os.path.join(root_folder, "openai-edit-ft-*"))

# for each file in the list, read the file convert it to a single line json and write it to a new file
for f in read_files:
    with open(f, "r") as f:
        file_content = f.read()
        # parse the json
        json_content = json.loads(file_content)
        # convert the json to a single line json
        single_line_json = json.dumps(json_content)
        # write the file to a new file with the same name but -edit removed
        with open(f.replace("-edit", ""), "w") as f2:
            f2.write(single_line_json)