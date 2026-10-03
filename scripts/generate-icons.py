"""Generates placeholder PWA icons into public/. Run: python3 scripts/generate-icons.py
Requires Pillow and a CJK font (Noto Sans CJK). Replace the output with final artwork any time."""
from PIL import Image, ImageDraw, ImageFont
import os

FONT_CANDIDATES = [
    "/usr/share/fonts/opentype/noto/NotoSansCJK-Black.ttc",
    "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc",
    "/System/Library/Fonts/ヒラギノ角ゴシック W8.ttc",
]
BG_TOP, BG_BOTTOM = (28, 32, 43), (11, 13, 18)
CORAL, MINT, INK = (255, 107, 129), (110, 231, 200), (27, 22, 32)
S = 1024  # supersample


def font(size):
    for path in FONT_CANDIDATES:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def render(size, maskable=False, rounded=True):
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    # background gradient
    grad = Image.new("RGBA", (S, S))
    gd = ImageDraw.Draw(grad)
    for y in range(S):
        t = y / (S - 1)
        c = tuple(int(BG_TOP[i] * (1 - t) + BG_BOTTOM[i] * t) for i in range(3)) + (255,)
        gd.line([(0, y), (S, y)], fill=c)
    mask = Image.new("L", (S, S), 0)
    md = ImageDraw.Draw(mask)
    if maskable or not rounded:
        md.rectangle([0, 0, S, S], fill=255)
    else:
        md.rounded_rectangle([0, 0, S, S], radius=int(S * 0.22), fill=255)
    img.paste(grad, (0, 0), mask)

    # content scale (maskable keeps everything inside the central safe zone)
    k = 0.62 if maskable else 0.8
    cx, cy = S / 2, S / 2 - S * 0.02
    w, h = S * k * 0.9, S * k * 0.7
    x0, y0, x1, y1 = cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([x0, y0, x1, y1], radius=int(h * 0.34), fill=CORAL)
    # tail
    d.polygon([(x0 + w * 0.2, y1 - 6), (x0 + w * 0.12, y1 + h * 0.26), (x0 + w * 0.42, y1 - 6)], fill=CORAL)
    # glyph
    f = font(int(h * 0.74))
    d.text((cx, cy - h * 0.02), "漫", font=f, fill=INK, anchor="mm")
    # mint accent dot
    r = h * 0.075
    d.ellipse([x1 - w * 0.06 - r, y0 + h * 0.02 - r + h * 0.08, x1 - w * 0.06 + r, y0 + h * 0.02 + r + h * 0.08], fill=MINT)
    return img.resize((size, size), Image.LANCZOS)


out = os.path.join(os.path.dirname(__file__), "..", "public")
os.makedirs(out, exist_ok=True)
render(192).save(os.path.join(out, "icon-192.png"))
render(512).save(os.path.join(out, "icon-512.png"))
render(512, maskable=True).save(os.path.join(out, "icon-maskable-512.png"))
render(180, rounded=False).convert("RGB").save(os.path.join(out, "apple-touch-icon.png"))
render(64).save(os.path.join(out, "favicon.png"))
print("icons written to", os.path.abspath(out))
