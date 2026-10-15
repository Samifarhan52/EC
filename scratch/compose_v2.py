import sys
import os
sys.path.append('/Users/apple/Library/Python/3.9/lib/python/site-packages')
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Load base image
base = Image.open('images/poster-option-4.jpg').convert('RGBA')
W, H = base.size

# Fonts
font_label = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 11)

def create_official_badge(name, logo_path, badge_d=96):
    # Create canvas with space for drop shadow
    pad = 12
    total_w = badge_d + pad * 2
    total_h = badge_d + pad * 2
    badge = Image.new('RGBA', (total_w, total_h), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(badge)
    
    cx = total_w // 2
    cy = (badge_d // 2) + pad
    r = badge_d // 2
    
    # Outer drop shadow
    for i in range(6, 0, -1):
        alpha = int(22 * (1 - i / 6.0))
        b_draw.ellipse([cx - r - i, cy - r - i + 2, cx + r + i, cy + r + i + 2], fill=(0, 0, 0, alpha))
    
    # Crisp White Circle
    b_draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 255, 255, 255), outline=(226, 232, 240, 255), width=2)
    
    # Load and scale official logo
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert('RGBA')
        
        # Determine max inner size
        max_logo_w = int(badge_d * 0.68)
        max_logo_h = int(badge_d * 0.52)
        logo.thumbnail((max_logo_w, max_logo_h), Image.Resampling.LANCZOS)
        
        lx = cx - (logo.width // 2)
        ly = cy - (badge_d // 2) + int(badge_d * 0.14) + (max_logo_h - logo.height) // 2
        badge.paste(logo, (lx, ly), logo)
    
    # Micro Pill Text Label at bottom of badge
    bbox = font_label.getbbox(name)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = cx - (tw // 2)
    ty = cy + r - th - 10
    
    pill_px = 6
    pill_py = 2
    b_draw.rounded_rectangle([tx - pill_px, ty - pill_py, tx + tw + pill_px, ty + th + pill_py + 1], radius=4, fill=(241, 245, 249, 245), outline=(203, 213, 225, 200), width=1)
    b_draw.text((tx, ty), name, fill=(15, 23, 42, 255), font=font_label)
    
    return badge

# 16 Official Badges as requested by user
# Left side: 8 (RVCE, BMSCE, PES, MSRIT, VIT, CHRIST, KCET, COMEDK)
# Right side: 8 (SJU / SJCC, NMIMS, SYMBIOSIS, MCC, JAIN, KRISTU, JEE, NEET)

badge_specs = [
    # Left Outer Arc
    ('KCET', 'images/logos_png/kcet.svg.png', 80, 160),
    ('RVCE', 'images/logos_png/rv_institutions.svg.png', 50, 290),
    ('BMSCE', 'images/logos/bmsce.png', 55, 420),
    ('COMEDK', 'images/logos_png/comedk.svg.png', 90, 550),
    
    # Left Inner Arc
    ('PES', 'images/logos/pes.png', 215, 175),
    ('MSRIT', 'images/logos_png/msrit_emblem.svg.png', 195, 305),
    ('VIT', 'images/logos/vit.png', 195, 435),
    ('CHRIST', 'images/logos/christ.png', 240, 565),
    
    # Right Inner Arc
    ('SJU / SJCC', 'images/logos/stjosephs.png', 1010, 175),
    ('NMIMS', 'images/logos_png/nmims.svg.png', 1035, 305),
    ('SYMBIOSIS', 'images/logos_png/symbiosis.svg.png', 1035, 435),
    ('MCC', 'images/logos_png/mcc.svg.png', 990, 565),
    
    # Right Outer Arc
    ('JEE', 'images/logos_png/jee.svg.png', 1150, 160),
    ('JAIN', 'images/logos_png/jain.svg.png', 1180, 290),
    ('KRISTU', 'images/logos_png/kristu.svg.png', 1175, 420),
    ('NEET', 'images/logos_png/neet.svg.png', 1130, 550)
]

# Paste badges onto base image
for (name, path, bx, by) in badge_specs:
    badge_img = create_official_badge(name, path, badge_d=98)
    # The badge has padding=12, so center it properly at bx, by
    base.paste(badge_img, (bx - 12, by - 12), badge_img)

# Save result
output_png = 'images/admissions-entrance-poster.png'
base.convert('RGB').save(output_png, quality=95)
base.convert('RGB').save('images/how-we-work-poster.png', quality=95)
print('Successfully generated official poster with all 16 requested official logos!')
