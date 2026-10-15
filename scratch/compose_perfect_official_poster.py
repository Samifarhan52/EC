import sys
import os
sys.path.append('/Users/apple/Library/Python/3.9/lib/python/site-packages')
from PIL import Image, ImageDraw, ImageFont, ImageEnhance

# Load base image
base = Image.open('images/poster-option-4.jpg').convert('RGBA')
W, H = base.size

# High quality fonts
font_label = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 11)

def create_badge(name, logo_path, badge_d=106):
    pad = 16
    total_w = badge_d + pad * 2
    total_h = badge_d + pad * 2
    badge = Image.new('RGBA', (total_w, total_h), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(badge)
    
    cx = total_w // 2
    cy = (badge_d // 2) + pad
    r = badge_d // 2
    
    # Soft drop shadow around the badge
    for i in range(8, 0, -1):
        alpha = int(32 * (1 - i / 8.0))
        b_draw.ellipse([cx - r - i, cy - r - i + 2, cx + r + i, cy + r + i + 2], fill=(0, 0, 0, alpha))
    
    # Crisp Solid White Circle
    b_draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 255, 255, 255), outline=(226, 232, 240, 255), width=2)
    
    # Load and process Logo
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert('RGBA')
        
        # If it's Christ logo, enhance contrast/richness so gold lines pop on white
        if 'christ' in logo_path.lower():
            # Enhance brightness and color contrast
            r_ch, g_ch, b_ch, a_ch = logo.split()
            rgb_img = Image.merge('RGB', (r_ch, g_ch, b_ch))
            rgb_img = ImageEnhance.Brightness(rgb_img).enhance(0.72)
            rgb_img = ImageEnhance.Color(rgb_img).enhance(1.4)
            r_ch2, g_ch2, b_ch2 = rgb_img.split()
            logo = Image.merge('RGBA', (r_ch2, g_ch2, b_ch2, a_ch))
            
        # Max dimensions inside circle
        max_logo_w = int(badge_d * 0.68)
        max_logo_h = int(badge_d * 0.52)
        logo.thumbnail((max_logo_w, max_logo_h), Image.Resampling.LANCZOS)
        
        lx = cx - (logo.width // 2)
        ly = cy - (badge_d // 2) + int(badge_d * 0.12) + (max_logo_h - logo.height) // 2
        badge.paste(logo, (lx, ly), logo)
    
    # Text Pill
    bbox = font_label.getbbox(name)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = cx - (tw // 2)
    ty = cy + r - th - 10
    
    pill_px = 7
    pill_py = 2
    b_draw.rounded_rectangle([tx - pill_px, ty - pill_py, tx + tw + pill_px, ty + th + pill_py + 1], radius=4, fill=(241, 245, 249, 252), outline=(203, 213, 225, 230), width=1)
    b_draw.text((tx, ty), name, fill=(15, 23, 42, 255), font=font_label)
    
    return badge

# 16 items: 12 premier colleges + 4 entrance exams
# Exact centroids measured from base poster to 0.1px precision
badges = [
    # Left Side (8 items)
    ('PES', 'images/logos/pes.png', 264, 216),
    ('MSRIT', 'images/logos_png/msrit_emblem.svg.png', 414, 231),
    ('RVCE', 'images/logos_png/rv_institutions.svg.png', 213, 340),
    ('BMSCE', 'images/logos/bmsce.png', 345, 411),
    ('VIT', 'images/logos/vit.png', 203, 477),
    ('CHRIST', 'images/logos/christ.png', 377, 589),
    ('KCET', 'images/logos_png/kcet.svg.png', 232, 606),
    ('COMEDK', 'images/logos_png/comedk.svg.png', 105, 410),
    
    # Right Side (8 items)
    ('SJU / SJCC', 'images/logos/stjosephs.png', 963, 232),
    ('NMIMS', 'images/logos_png/nmims.svg.png', 1112, 217),
    ('MCC', 'images/logos_png/mcc.svg.png', 1163, 340),
    ('SYMBIOSIS', 'images/logos_png/symbiosis.svg.png', 1030, 411),
    ('JAIN', 'images/logos_png/jain.svg.png', 1173, 476),
    ('KRISTU', 'images/logos_png/kristu.svg.png', 999, 588),
    ('JEE', 'images/logos_png/jee.svg.png', 1147, 607),
    ('NEET', 'images/logos_png/neet.svg.png', 1270, 410)
]

badge_d = 106
pad = 16

for (name, path, cx, cy) in badges:
    b_img = create_badge(name, path, badge_d=badge_d)
    px = cx - (badge_d // 2) - pad
    py = cy - (badge_d // 2) - pad
    base.paste(b_img, (px, py), b_img)

# Save output to both target filenames
output_png = 'images/admissions-entrance-poster.png'
base.convert('RGB').save(output_png, quality=95)
base.convert('RGB').save('images/how-we-work-poster.png', quality=95)
print('Successfully generated perfect official poster with 16 official logos!')
