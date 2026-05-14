import re

file_path = "service-detail.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all occurrences of 'deco-interieur': {
matches = list(re.finditer(r"'deco-interieur':\s*{", content))

if len(matches) > 1:
    print(f"Found {len(matches)} occurrences of 'deco-interieur'. Removing the last one.")
    last_match = matches[-1]
    start_pos = last_match.start()
    
    # The end of the duplicate block should be just before };
    # We find the next occurrence of };
    end_pattern = re.compile(r"\n\s+},\s+};", re.DOTALL)
    end_match = end_pattern.search(content, start_pos)
    
    if end_match:
        end_pos = end_match.start() + 6 # Keep the \n and } and , part? No, remove it.
        # Actually, let's be safer.
        # The block is between start_pos and the end_match.start() + 7 (to include the newline and indentation of the closing brace)
        
        # We want to keep the final };
        # So we remove from start_pos to end_match.start() + 7
        
        new_content = content[:start_pos] + content[end_match.start() + 7:]
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully removed the duplicate.")
    else:
        print("Could not find the end of the block.")
else:
    print("Only one or zero occurrences found. No action taken.")
