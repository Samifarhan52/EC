import sys
import os
import math
sys.path.append('/Users/apple/Library/Python/3.9/lib/python/site-packages')
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import numpy as np

# 1. Base Plate with smooth feathered cosmic gradient
base = Image.open('scratch/clean_base_plate.png').convert('RGBA')
W, H = base.size

# Soft feathered background mask to dissolve old circle edges
bg_mask = Image.new('L', (W, H), 0)
m_draw = ImageDraw.Draw(bg_mask)
m_draw.rectangle([0, 155, 440, 675], fill=255)
m_draw.rectangle([930, 155, W, 675], fill=255)
bg_mask = bg_mask.filter(ImageFilter.GaussianBlur(radius=20))

blurred_base = base.filter(ImageFilter.GaussianBlur(radius=7))
base.paste(blurred_base, (0, 0), bg_mask)

# 2. Glowing Concentric Orbital Rings & Stars
orbit_overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
o_draw = ImageDraw.Draw(orbit_overlay)
cx_orbit, cy_orbit = 688, 410

# Inner orbital ring
o_draw.ellipse([cx_orbit - 355, cy_orbit - 215, cx_orbit + 355, cy_orbit + 215], outline=(168, 85, 247, 50), width=2)
# Outer orbital ring
o_draw.ellipse([cx_orbit - 495, cy_orbit - 225, cx_orbit + 495, cy_orbit + 225], outline=(59, 130, 246, 45), width=2)

stars = [
    (140, 260), (120, 420), (150, 560), (100, 340), (280, 150),
    (1240, 260), (1260, 420), (1230, 560), (1280, 340), (1100, 150)
]
for sx, sy in stars:
    o_draw.ellipse([sx - 2, sy - 2, sx + 2, sy + 2], fill=(255, 255, 255, 130))
    o_draw.ellipse([sx - 4, sy - 4, sx + 4, sy + 4], fill=(255, 255, 255, 35))

base = Image.alpha_composite(base, orbit_overlay)

# 3. High-Quality Badge Renderer (Clean, Premium, Zero Stickers)
font_title = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 12)

def create_card_badge(title, logo_path, text_color=(15, 23, 42, 255), badge_d=106):
    pad = 16
    total_w = badge_d + pad * 2
    total_h = badge_d + pad * 2
    badge = Image.new('RGBA', (total_w, total_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(badge)
    
    cx = total_w // 2
    cy = (badge_d // 2) + pad
    r = badge_d // 2
    
    # Soft natural multi-layered shadow
    for i in range(8, 0, -1):
        alpha = int(24 * (1 - i / 8.0))
        draw.ellipse([cx - r - i, cy - r - i + 2, cx + r + i, cy + r + i + 2], fill=(0, 0, 0, alpha))
    
    # Pure White Circle with subtle slate border
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 255, 255, 255), outline=(226, 232, 240, 255), width=2)
    
    # Logo Placement in top portion
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert('RGBA')
        
        if 'christ' in logo_path.lower():
            r_ch, g_ch, b_ch, a_ch = logo.split()
            rgb_img = Image.merge('RGB', (r_ch, g_ch, b_ch))
            rgb_img = ImageEnhance.Brightness(rgb_img).enhance(0.68)
            rgb_img = ImageEnhance.Color(rgb_img).enhance(1.6)
            r_ch2, g_ch2, b_ch2 = rgb_img.split()
            logo = Image.merge('RGBA', (r_ch2, g_ch2, b_ch2, a_ch))
            
        max_w = int(badge_d * 0.58)
        max_h = int(badge_d * 0.46)
        logo.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
        
        # Center in upper half
        lx = cx - (logo.width // 2)
        ly = cy - r + 14 + (max_h - logo.height) // 2
        badge.paste(logo, (lx, ly), logo)
    
    # Centered bold typography in lower half
    bbox = font_title.getbbox(title)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = cx - (tw // 2)
    ty = cy + r - th - 16
    draw.text((tx, ty), title, fill=text_color, font=font_title)
    
    return badge

# 4. Symmetrical Concentric Orbit Coordinates (8 Left, 8 Right)
badge_configs = [
    # --- LEFT OUTER ARC (4 items) ---
    ('PES', 'images/logos/pes.png', (15, 23, 42, 255), 255, 215),
    ('RVCE', 'images/logos_png/rv_institutions.svg.png', (15, 23, 42, 255), 205, 345),
    ('COMEDK', 'images/clean_logos/comedk.png', (220, 38, 38, 255), 195, 475),
    ('KCET', 'images/clean_logos/kcet.png', (30, 58, 138, 255), 235, 605),
    
    # --- LEFT INNER ARC (4 items) ---
    ('MSRIT', 'images/logos_png/msrit_emblem.svg.png', (15, 23, 42, 255), 400, 225),
    ('BMSCE', 'images/logos/bmsce.png', (15, 23, 42, 255), 340, 350),
    ('VIT', 'images/logos/vit.png', (15, 23, 42, 255), 335, 475),
    ('CHRIST', 'images/logos/christ.png', (15, 23, 42, 255), 380, 600),
    
    # --- RIGHT INNER ARC (4 items) ---
    ('SJU / SJCC', 'images/logos/stjosephs.png', (15, 23, 42, 255), 976, 225),
    ('SYMBIOSIS', 'images/clean_logos/symbiosis.png', (185, 28, 28, 255), 1036, 350),
    ('KRISTU', 'images/clean_logos/kristu.png', (5, 150, 105, 255), 1041, 475),
    ('JAIN', 'images/clean_logos/jain.png', (2, 132, 199, 255), 996, 600),
    
    # --- RIGHT OUTER ARC (4 items) ---
    ('NMIMS', 'images/clean_logos/nmims.png', (153, 27, 27, 255), 1121, 215),
    ('MCC', 'images/logos_png/mcc.svg.png', (15, 23, 42, 255), 1171, 345),
    ('NEET', 'images/clean_logos/neet.png', (5, 150, 105, 255), 1181, 475),
    ('JEE', 'images/clean_logos/jee.png', (2, 132, 199, 255), 1141, 605)
]

badge_d = 106
pad = 16

for (title, logo_path, text_color, cx, cy) in badge_configs:
    badge_img = create_card_badge(title, logo_path, text_color=text_color, badge_d=badge_d)
    px = cx - (badge_d // 2) - pad
    py = cy - (badge_d // 2) - pad
    base.paste(badge_img, (px, py), badge_img)

# 5. Save outputs
output_path = 'images/admissions-entrance-poster.png'
base.convert('RGB').save(output_path, quality=96)
base.convert('RGB').save('images/how-we-work-poster.png', quality=96)
print('Masterpiece poster updated successfully!')
