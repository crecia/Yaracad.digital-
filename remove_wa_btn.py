import os
import re

# Dossier du projet
dossier = r"c:\Users\HP\Desktop\Dossier personnel\stage 2026 cad digital\site web"

# Expression régulière pour correspondre au bouton WhatsApp et à ses balises internes
pattern = re.compile(
    r'\s*<a href="https://wa\.me/212661678047" class="float-btn whatsapp" target="_blank">\s*<i class="fa-brands fa-whatsapp"></i>\s*<span class="pulse"></span>\s*</a>',
    re.DOTALL
)

count = 0
for nom_fichier in os.listdir(dossier):
    if nom_fichier.endswith(".html"):
        chemin_fichier = os.path.join(dossier, nom_fichier)
        
        with open(chemin_fichier, 'r', encoding='utf-8') as f:
            contenu = f.read()
            
        nouveau_contenu, num_subs = re.subn(pattern, '', contenu)
        
        if num_subs > 0:
            with open(chemin_fichier, 'w', encoding='utf-8') as f:
                f.write(nouveau_contenu)
            print(f"Modifié : {nom_fichier} ({num_subs} remplacement(s))")
            count += 1

print(f"Terminé. {count} fichier(s) modifié(s).")
