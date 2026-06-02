import os

script_path = r'C:\Users\HP\Desktop\Dossier personnel\stage 2026 cad digital\site web\script.js'
style_path = r'C:\Users\HP\Desktop\Dossier personnel\stage 2026 cad digital\site web\style.css'

with open(script_path, 'r', encoding='utf-8') as f:
    script_content = f.read()

# Replace chatbot with assistant in IDs and classes
script_content = script_content.replace('chatbot', 'assistant')
script_content = script_content.replace('CHATBOT', 'ASSISTANT')
script_content = script_content.replace('Chatbot', 'Assistant')

# Update initialization logic to handle already loaded DOM
init_old = '''// Initialiser le assistant au chargement
document.addEventListener('DOMContentLoaded', () => {
    initAssistant();
});'''

init_new = '''// Initialiser l'assistant (gestion Vercel / defer)
function tryInitAssistant() {
    if (!document.getElementById('yara-assistant-wrapper')) {
        initAssistant();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInitAssistant);
} else {
    tryInitAssistant();
}'''

script_content = script_content.replace(init_old, init_new)

with open(script_path, 'w', encoding='utf-8') as f:
    f.write(script_content)

with open(style_path, 'r', encoding='utf-8') as f:
    style_content = f.read()

style_content = style_content.replace('chatbot', 'assistant')
style_content = style_content.replace('CHATBOT', 'ASSISTANT')
style_content = style_content.replace('Chatbot', 'Assistant')

with open(style_path, 'w', encoding='utf-8') as f:
    f.write(style_content)

print('Replacement complete.')
