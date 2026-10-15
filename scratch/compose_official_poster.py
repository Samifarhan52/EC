import sys
import os
import math
sys.path.append('/Users/apple/Library/Python/3.9/lib/python/site-packages')
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

W, H = 1600, 900

# 1. Create Base Canvas with Smooth Multi-Color Gradient
canvas = Image.new('RGB', (W, H))
draw = ImageDraw.Draw(canvas)

# Generate smooth horizontal + radial gradient: Royal Blue -> Electric Purple -> Magenta/Sunrise
for x in range(W):
    ratio = x / float(W)
    # Blend from Left (3, 21, 103) -> Center (55, 18, 120) -> Right (95, 14, 115)
    if ratio < 0.5:
        sub_ratio = ratio / 0.5
        r = int(3 + sub_ratio * (55 - 3))
        g = int(21 + sub_ratio * (18 - 21))
        b = int(103 + sub_ratio * (120 - 103))
    else:
        sub_ratio = (ratio - 0.5) / 0.5
        r = int(55 + sub_ratio * (105 - 55))
        g = int(18 + sub_ratio * (14 - 18))
        b = int(120 + sub_ratio * (100 - 120))
    for y in range(H):
        canvas.putpixel((x, y), (r, g, b))

# 2. Add Ambient Radial Glows (Cyan/Blue on Left, Golden/Purple in Center, Pink/Magenta on Right)
glow_overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
glow_draw = ImageDraw.Draw(glow_overlay)

# Center Golden/Violet Glow
center_glow = (W // 2, H // 2 + 30)
for r in range(480, 0, -20):
    alpha = int(18 * (1 - r / 480.0))
    glow_draw.ellipse([center_glow[0]-r, center_glow[1]-r, center_glow[0]+r, center_glow[1]+r], fill=(168, 85, 247, alpha))

# Cyan Accent on Left
left_glow = (260, 450)
for r in range(400, 0, -20):
    alpha = int(14 * (1 - r / 400.0))
    glow_draw.ellipse([left_glow[0]-r, left_glow[1]-r, left_glow[0]+r, left_glow[1]+r], fill=(37, 99, 235, alpha))

# Magenta Accent on Right
right_glow = (1340, 450)
for r in range(400, 0, -20):
    alpha = int(16 * (1 - r / 400.0))
    glow_draw.ellipse([right_glow[0]-r, right_glow[1]-r, right_glow[0]+r, right_glow[1]+r], fill=(219, 39, 119, alpha))

canvas = Image.alpha_composite(canvas.convert('RGBA'), glow_overlay)

# 3. Draw Concentric Glowing Orbital Rings
ring_overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
ring_draw = ImageDraw.Draw(ring_overlay)

ring_center = (W // 2, H // 2 + 50)
ring_radii = [280, 420, 560, 700]

for radius in ring_radii:
    # Outer soft glow line
    ring_draw.ellipse([ring_center[0]-radius, ring_center[1]-radius*0.88, ring_center[0]+radius, ring_center[1]+radius*0.88], outline=(147, 197, 253, 30), width=4)
    # Inner crisp line
    ring_draw.ellipse([ring_center[0]-radius, ring_center[1]-radius*0.88, ring_center[0]+radius, ring_center[1]+radius*0.88], outline=(255, 255, 255, 60), width=1)

# Subtle constellation dots
dot_coords = [
    (180, 160), (280, 130), (120, 320), (220, 380), (150, 680), (260, 780),
    (1380, 140), (1480, 200), (1350, 340), (1460, 480), (1380, 740), (1460, 780),
    (740, 120), (860, 120)
]
for (dx, dy) in dot_coords:
    ring_draw.ellipse([dx-2, dy-2, dx+2, dy+2], fill=(255, 255, 255, 120))

canvas = Image.alpha_composite(canvas, ring_overlay)

# 4. Extract and Paste Students in Center
# In poster-option-4.jpg, students are in center x ≈ 480..910, y ≈ 210..760
src_option4 = Image.open('images/poster-option-4.jpg').convert('RGBA')
src_w, src_h = src_option4.size

# Crop students from src
student_crop = src_option4.crop((470, 200, 920, 768))
# Scale students to fit nicely on 1600x900 canvas
target_stud_h = int(H * 0.72)
scale_factor = target_stud_h / float(student_crop.height)
target_stud_w = int(student_crop.width * scale_factor)
student_scaled = student_crop.resize((target_stud_w, target_stud_h), Image.Resampling.LANCZOS)

# Create soft feather mask for the bottom edge so students blend cleanly into the bottom bar
mask = Image.new('L', student_scaled.size, 255)
mask_draw = ImageDraw.Draw(mask)
for y in range(student_scaled.height - 40, student_scaled.height):
    fade = int(255 * (1 - (y - (student_scaled.height - 40)) / 40.0))
    mask_draw.line([(0, y), (student_scaled.width, y)], fill=fade)

stud_x = (W - target_stud_w) // 2
stud_y = H - target_stud_h - 60
canvas.paste(student_scaled, (stud_x, stud_y), mask)

# 5. Helper Function: Create Official Circular Badge
font_bold = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 12)
font_badge_large = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 14)

def make_badge(name, logo_path, badge_d=120):
    badge = Image.new('RGBA', (badge_d + 16, badge_d + 16), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(badge)
    
    # Shadow
    for i in range(5, 0, -1):
        alpha = int(20 * (1 - i / 5.0))
        b_draw.ellipse([8 - i, 8 - i + 2, 8 + badge_d + i, 8 + badge_d + i + 2], fill=(0, 0, 0, alpha))
    
    # White Card Circle
    b_draw.ellipse([8, 8, 8 + badge_d, 8 + badge_d], fill=(255, 255, 255, 250), outline=(226, 232, 240, 255), width=2)
    
    # Load and process Logo
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert('RGBA')
        
        # If image has white background, keep it or clean
        # Resize to fit in inner area (approx 72x72)
        inner_max = int(badge_d * 0.62)
        logo.thumbnail((inner_max, inner_max), Image.Resampling.LANCZOS)
        
        # Center logo
        lx = 8 + (badge_d - logo.width) // 2
        ly = 8 + int(badge_d * 0.16) + (inner_max - logo.height) // 2
        badge.paste(logo, (lx, ly), logo)
    
    # Text Label at Bottom of Badge
    # Check text width
    bbox = font_bold.getbbox(name)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = 8 + (badge_d - tw) // 2
    ty = 8 + badge_d - th - 12
    
    # Sub background pill for text
    pill_pad_x = 6
    pill_pad_y = 2
    b_draw.rounded_rectangle([tx - pill_pad_x, ty - pill_pad_y, tx + tw + pill_pad_x, ty + th + pill_pad_y + 1], radius=4, fill=(241, 245, 249, 240))
    b_draw.text((tx, ty), name, fill=(15, 23, 42, 255), font=font_bold)
    
    return badge

# 6. Positions for all 16 Badges
# Left side (8): RVCE, BMSCE, PES, MSRIT, VIT, KCET, COMEDK, CHRIST
# Right side (8): SJU / SJCC, NMIMS, SYMBIOSIS, MCC, JAIN, KRISTU, JEE, NEET

badges_data = [
    # Left Outer Arc
    ('KCET', 'images/logos_png/kcet.svg.png', 110, 220),
    ('RVCE', 'images/logos/rvce.png', 70, 370),
    ('BMSCE', 'images/logos/bmsce.png', 80, 520),
    ('COMEDK', 'images/logos_png/comedk.svg.png', 140, 670),
    
    # Left Inner Arc
    ('PES', 'images/logos/pes.png', 280, 190),
    ('MSRIT', 'images/logos/msrit.png', 260, 340),
    ('VIT', 'images/logos/vit.png', 255, 490),
    ('CHRIST', 'images/logos/christ.png', 320, 650),
    
    # Right Inner Arc
    ('SJU / SJCC', 'images/logos/stjosephs.png', 1180, 190),
    ('NMIMS', 'images/logos_png/nmims.svg.png', 1210, 340),
    ('SYMBIOSIS', 'images/logos_png/symbiosis.svg.png', 1215, 490),
    ('MCC', 'images/logos_png/mcc.svg.png', 1150, 650),
    
    # Right Outer Arc
    ('JEE', 'images/logos_png/jee.svg.png', 1370, 220),
    ('JAIN', 'images/logos_png/jain.svg.png', 1410, 370),
    ('KRISTU', 'images/logos_png/kristu.svg.png', 1400, 520),
    ('NEET', 'images/logos_png/neet.svg.png', 1340, 670)
]

badge_overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
for (name, path, bx, by) in badges_data:
    b_img = make_badge(name, path, badge_d=122)
    badge_overlay.paste(b_img, (bx, by), b_img)

canvas = Image.alpha_composite(canvas, badge_overlay)

# 7. Add Top Header Bar
header_overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
h_draw = ImageDraw.Draw(header_overlay)

font_title = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 38)
font_brand = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 20)
font_pill = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 15)

# Brand eyebrow
brand_text = "The Edu Consultant"
b_box = font_brand.getbbox(brand_text)
b_w = b_box[2] - b_box[0]
h_draw.text(((W - b_w) // 2, 28), brand_text, fill=(241, 245, 249, 230), font=font_brand)

# Main Title: BANGALORE ADMISSIONS & ENTRANCE PREPARATIONS
title_text = "BANGALORE ADMISSIONS & ENTRANCE PREPARATIONS"
t_box = font_title.getbbox(title_text)
t_w = t_box[2] - t_box[0]
# Shadow
h_draw.text(((W - t_w) // 2 + 2, 60 + 2), title_text, fill=(0, 0, 0, 160), font=font_title)
h_draw.text(((W - t_w) // 2, 60), title_text, fill=(255, 255, 255, 255), font=font_title)

# Status Pill Badge: "Direct Quota • Merit Seats • Entrance Prep 2026-27"
pill_text = "DIRECT QUOTA • MERIT SEATS • ENTRANCE PREP 2026-27"
p_box = font_pill.getbbox(pill_text)
p_w = p_box[2] - p_box[0]
p_h = p_box[3] - p_box[1]
px = (W - p_w) // 2
py = 115
h_draw.rounded_rectangle([px - 18, py - 6, px + p_w + 18, py + p_h + 8], radius=16, fill=(255, 255, 255, 30), outline=(255, 255, 255, 80), width=1)
h_draw.text((px, py), pill_text, fill=(254, 240, 138, 255), font=font_pill)

canvas = Image.alpha_composite(canvas, header_overlay)

# 8. Add Bottom Helpline Bar
footer_overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
f_draw = ImageDraw.Draw(footer_overlay)

bar_y = H - 76
f_draw.rounded_rectangle([40, bar_y, W - 40, bar_y + 58], radius=18, fill=(15, 23, 42, 240), outline=(255, 255, 255, 40), width=2)

font_phone_bold = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 23)
font_phone_sub = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 14)

phone_str = "9845371459  /  8884058241  /  9731998555"
p_box = font_phone_bold.getbbox(phone_str)
p_w = p_box[2] - p_box[0]

# Left label
f_draw.text((70, bar_y + 18), "Direct Helpline :", fill=(148, 163, 184, 255), font=font_phone_sub)

# Center Phones
f_draw.text(((W - p_w) // 2, bar_y + 14), phone_str, fill=(255, 255, 255, 255), font=font_phone_bold)

# Right website
web_str = "www.theeduconsultant.com"
w_box = font_phone_sub.getbbox(web_str)
w_w = w_box[2] - w_box[0]
f_draw.text((W - 70 - w_w, bar_y + 18), web_str, fill=(253, 224, 71, 255), font=font_phone_sub)

canvas = Image.alpha_composite(canvas, footer_overlay)

# 9. Save output
output_path = 'images/admissions-entrance-poster.png'
canvas.convert('RGB').save(output_path, quality=95)
print(f'Successfully generated official poster at {output_path} (size={W}x{H})')
