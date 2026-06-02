import os

for f in os.listdir('.'):
    if f.endswith('.html'):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Fixing the contact section
        old_contact = '<p>+212 0661678047 <br> +212 0535944021</p>'
        new_contact = '<p><i class="fa-brands fa-whatsapp" style="margin-right: 8px; color: #df8a21;"></i>+212 0661678047<br><i class="fa-solid fa-phone" style="margin-right: 8px; margin-top: 10px; color: #df8a21;"></i>+212 0535944021</p>'
        
        # Fixing the footer section
        old_footer = '<li><i class="fa-solid fa-phone"></i> +212 0661678047 / +212 0535944021</li>'
        new_footer = '<li><i class="fa-brands fa-whatsapp"></i> +212 0661678047</li>\n                        <li><i class="fa-solid fa-phone"></i> +212 0535944021</li>'
        
        content = content.replace(old_contact, new_contact)
        content = content.replace(old_footer, new_footer)
        
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
print('Formatting complete.')
