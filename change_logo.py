import os

for f in os.listdir('.'):
    if f.endswith('.html') or f.endswith('.py'):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Replace the main header logo
        content = content.replace('<span class="yara-accent">Yara</span>cad.Digital', '<span class="yara-accent">Yara</span>cad.Digital')
        
        # Replace the footer/other logos
        content = content.replace('<span class="yara-accent">Yara</span>cad.Digital', '<span class="yara-accent">Yara</span>cad.Digital')
        
        # In case there's any other logo variation, like "YARATECH"
        # We should be careful not to replace text content inside paragraphs if it exists.
        # But wait, looking at the previous grep, all logo instances are formatted with spans.

        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)

print('Logo text replaced successfully.')
