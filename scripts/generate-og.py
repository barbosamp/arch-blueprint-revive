"""Generates public/og-seminario.jpg — 1200x630 OG image for social sharing."""
from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630
BLACKOUT = (10, 10, 10)
GOLD = (232, 184, 75)
WHITE = (245, 245, 240)
GRAY = (102, 102, 102)

canvas = Image.new("RGB", (W, H), BLACKOUT)
draw = ImageDraw.Draw(canvas)

# ── Tainan photo on the left ───────────────────────────────────────────────
photo_path = os.path.join(os.path.dirname(__file__), "../public/tainan-dalpra.jpg")
photo = Image.open(photo_path).convert("RGB")

PHOTO_W = 460
scale = H / photo.height
photo = photo.resize((int(photo.width * scale), H), Image.LANCZOS)
# Center-crop to PHOTO_W
if photo.width > PHOTO_W:
    left = (photo.width - PHOTO_W) // 2
    photo = photo.crop((left, 0, left + PHOTO_W, H))

canvas.paste(photo, (0, 0))

# ── Gradient overlay over photo (left → transparent) ──────────────────────
overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
od = ImageDraw.Draw(overlay)
for x in range(PHOTO_W + 80):
    alpha = int(max(0, (x - (PHOTO_W - 120)) / 120) * 200)
    od.line([(x, 0), (x, H)], fill=(10, 10, 10, alpha))

canvas = canvas.convert("RGBA")
canvas.alpha_composite(overlay)
canvas = canvas.convert("RGB")
draw = ImageDraw.Draw(canvas)

# ── Gold top bar ───────────────────────────────────────────────────────────
draw.rectangle([(0, 0), (W, 3)], fill=GOLD)

# ── Vertical gold accent line ──────────────────────────────────────────────
X = PHOTO_W + 10
draw.rectangle([(X, 40), (X + 2, H - 40)], fill=(*GOLD, 80))

# ── Fonts ──────────────────────────────────────────────────────────────────
FONTS = "/usr/share/fonts/truetype/liberation"
try:
    font_bold   = ImageFont.truetype(f"{FONTS}/LiberationSans-Bold.ttf", 80)
    font_title  = ImageFont.truetype(f"{FONTS}/LiberationSans-Bold.ttf", 56)
    font_sub    = ImageFont.truetype(f"{FONTS}/LiberationSans-Bold.ttf", 28)
    font_mono   = ImageFont.truetype(f"{FONTS}/LiberationMono-Bold.ttf", 14)
    font_detail = ImageFont.truetype(f"{FONTS}/LiberationSans-Regular.ttf", 18)
except Exception:
    font_bold = font_title = font_sub = font_mono = font_detail = ImageFont.load_default()

TXT_X = X + 40
Y = 70

# ── BLACKBOX. label ────────────────────────────────────────────────────────
draw.text((TXT_X, Y), "BLACKBOX.", font=font_bold, fill=WHITE)
BY = Y + 85
draw.text((TXT_X, BY), "JIU-JITSU ACADEMY", font=font_mono, fill=GOLD)

# ── Gold divider ───────────────────────────────────────────────────────────
DY = BY + 30
draw.rectangle([(TXT_X, DY), (TXT_X + 200, DY + 2)], fill=GOLD)
draw.rectangle([(TXT_X + 210, DY), (TXT_X + 230, DY + 2)], fill=(*GOLD[:3], 80))

# ── SEMINÁRIO / athlete ────────────────────────────────────────────────────
SY = DY + 22
draw.text((TXT_X, SY), "SEMINÁRIO", font=font_mono, fill=(*GRAY, 255))
SY += 22
draw.text((TXT_X, SY), "TAINAN", font=font_title, fill=WHITE)
SY += 60
draw.text((TXT_X, SY), "DALPRA", font=font_title, fill=GOLD)

# ── Event details ──────────────────────────────────────────────────────────
SY += 72
draw.text((TXT_X, SY), "14 DE JUNHO DE 2025", font=font_sub, fill=WHITE)
SY += 38
draw.text((TXT_X, SY), "18H00 ÀS 20H00  ·  CAJAMAR, SP", font=font_detail, fill=(*GRAY, 255))

# ── Price badge ────────────────────────────────────────────────────────────
SY += 36
BADGE_X, BADGE_Y = TXT_X, SY
draw.rectangle(
    [(BADGE_X, BADGE_Y), (BADGE_X + 170, BADGE_Y + 38)],
    fill=GOLD
)
draw.text((BADGE_X + 12, BADGE_Y + 6), "R$ 259,00", font=font_sub, fill=BLACKOUT)

# ── Bottom tag ─────────────────────────────────────────────────────────────
TAG_Y = H - 36
draw.text(
    (TXT_X, TAG_Y),
    "VAGAS LIMITADAS  —  blackboxjj.com.br",
    font=font_mono,
    fill=(*GRAY, 200),
)

# ── Gold bottom bar ────────────────────────────────────────────────────────
draw.rectangle([(0, H - 3), (W, H)], fill=GOLD)

out = os.path.join(os.path.dirname(__file__), "../public/og-seminario.jpg")
canvas.save(out, "JPEG", quality=92)
print(f"Saved: {out}  ({os.path.getsize(out) // 1024} KB)")
