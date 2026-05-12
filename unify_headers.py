import os
import re

root_dir = "."

perfect_header = r"""    <header id="header">
        <div class="logo">
            <a href="index.html">YARATECH<span class="yara-accent">.</span></a>
            <span class="sub-logo">VOTRE UNIVERS NOTRE EXPERTISE</span>
        </div>
        <nav id="nav-menu">
            <ul>
                <li><a href="index.html#accueil">Accueil</a></li>
                
                <li class="has-dropdown">
                    <a href="services.html">Services <i class="fa-solid fa-chevron-down" style="font-size: 10px; margin-left: 5px;"></i></a>
                    <div class="yara-mega-menu">
                        <div class="yara-mega-explorer">
                            <div class="yara-mega-nav">
                                <a href="service-detail.html?id=archi" class="yara-mega-nav-item active" data-mega="arch-mega" style="text-decoration: none; color: inherit; display: flex; align-items: center; justify-content: space-between; width: 100%;">
                                    <span>Architecte d'intérieur</span>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </a>
                                <a href="amenagement-interieur.html" class="yara-mega-nav-item" data-mega="am-mega" style="text-decoration: none; color: inherit; display: flex; align-items: center; justify-content: space-between; width: 100%;">
                                    <span>Aménagement intérieur</span>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </a>
                                <a href="service-detail.html?id=conception3d" class="yara-mega-nav-item" data-mega="plan-mega" style="text-decoration: none; color: inherit; display: flex; align-items: center; justify-content: space-between; width: 100%;">
                                    <span>Conception plan 3D & 2D</span>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </a>
                                <a href="service-detail.html?id=design" class="yara-mega-nav-item" data-mega="deco-mega" style="text-decoration: none; color: inherit; display: flex; align-items: center; justify-content: space-between; width: 100%;">
                                    <span>Design & décoration d'intérieur</span>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </a>
                            </div>
                            <div class="yara-mega-panel">
                                <div class="yara-mega-content active" id="arch-mega">
                                    <a href="service-detail.html?id=prix-architecte">Prix architecte d'intérieur</a>
                                </div>
                                <div class="yara-mega-content" id="am-mega">
                                    <a href="service-detail.html?id=am-bureaux">Aménagement de bureaux</a>
                                    <a href="service-detail.html?id=am-magasin">Aménagement magasin & boutique</a>
                                    <a href="service-detail.html?id=am-pharmacie">Aménagement pharmacie & parapharmacie</a>
                                    <a href="service-detail.html?id=am-restaurant">Aménagement restaurant, café & bar</a>
                                    <a href="service-detail.html?id=am-appartement">Aménagement appartement & studio</a>
                                    <a href="service-detail.html?id=am-cuisine">Aménagement cuisine</a>
                                    <a href="service-detail.html?id=am-sdb">Aménagement salle de bain</a>
                                </div>
                                <div class="yara-mega-content" id="plan-mega">
                                    <a href="service-detail.html?id=plan-maison">Plan maison 3D & 2D</a>
                                    <a href="service-detail.html?id=plan-appartement">Plan appartement 3D & 2D</a>
                                    <a href="service-detail.html?id=plan-villa">Plan villa 3D & 2D</a>
                                    <a href="service-detail.html?id=plan-cuisine">Conception cuisine 3D</a>
                                </div>
                                <div class="yara-mega-content" id="deco-mega">
                                    <a href="service-detail.html?id=deco-interieur">Décoratrice & décorateur d'intérieur</a>
                                    <a href="service-detail.html?id=deco-appartement">Décoration appartement</a>
                                    <a href="service-detail.html?id=deco-coiffure">Décoration salon de coiffure</a>
                                    <a href="service-detail.html?id=deco-medical">Décoration cabinet médical & dentaire</a>
                                    <a href="service-detail.html?id=deco-bureau">Décoration bureau professionnel</a>
                                    <a href="service-detail.html?id=deco-chambre">Décoration chambre</a>
                                    <a href="service-detail.html?id=deco-salon">Décoration salon</a>
                                    <a href="service-detail.html?id=deco-sdb">Décoration salle de bain</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

                <li><a href="realisations.html">Réalisations</a></li>
            </ul>
        </nav>
        <div class="header-actions">
            <a href="tel:+2120779644502" class="header-phone hide-mobile">+212 07 79 64 45 02</a>
            <a href="contact.html" class="cta-button hide-mobile">Contact</a>
            <div class="mobile-nav-toggle" id="mobile-nav-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </header>"""

for filename in os.listdir(root_dir):
    if filename.endswith(".html"):
        filepath = os.path.join(root_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Replace the entire <header> tag
        new_content = re.sub(r'<header.*?</header>', perfect_header, content, flags=re.DOTALL)
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Header unified in {filename}")
