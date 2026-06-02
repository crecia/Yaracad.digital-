import os

for f in os.listdir('.'):
    if f.endswith('.html'):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Replace in contact sections
        content = content.replace('<p>+212 0661678047</p>', '<p>+212 0661678047 <br> +212 0535944021</p>')
        
        # Replace in footers
        content = content.replace('<li><i class="fa-solid fa-phone"></i> +212 0661678047</li>', '<li><i class="fa-solid fa-phone"></i> +212 0661678047 / +212 0535944021</li>')
        
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
print('Fixed phone number added.')
