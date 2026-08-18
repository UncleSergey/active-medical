from PIL import Image

source = "/home/ubuntu/upload/ChatGPTImage18авг.2026г.,18_43_35.png"
target = "/home/ubuntu/webdev-static-assets/active-medical-hero-reference-body.png"
image = Image.open(source).convert("RGB")
# Remove the reference's embedded 100 px header while preserving the full hero composition.
image.crop((0, 100, image.width, image.height)).save(target, optimize=True, quality=94)
print(target)
