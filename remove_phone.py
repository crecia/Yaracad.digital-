import os
import re

for f in os.listdir('.'):
    if f.endswith('.html') or f == 'unify_headers.py':
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # We only want to remove the phone number in the header: `<a href="tel:+2120779644502" class="header-phone hide-mobile">+212 07 79 64 45 02</a>`
        # Using a precise regex for this exact line to avoid removing it from the footer if the user only wanted it out of the header.
        content = re.sub(r'\s*<a href="tel:\+2120779644502" class="header-phone hide-mobile">\+212 07 79 64 45 02</a>', '', content)
        
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
print('Done')
