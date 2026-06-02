import os

script_path = r'C:\Users\HP\Desktop\Dossier personnel\stage 2026 cad digital\site web\script.js'

with open(script_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the first DOMContentLoaded
old_code = '''// Initializations
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();'''

new_code = '''// Initializations
function initAll() {
    if (window.appInitialized) return;
    window.appInitialized = true;
    initAnimations();'''

content = content.replace(old_code, new_code)

old_close = '''    // Initialize
    initYaraSlider();
    initAnimations();
});'''

new_close = '''    // Initialize
    initYaraSlider();
    initAnimations();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}'''

content = content.replace(old_close, new_close)

with open(script_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated initializations.')
