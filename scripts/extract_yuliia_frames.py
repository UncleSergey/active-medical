import cv2
from pathlib import Path

source = Path('/home/ubuntu/upload/ЗубмудростіболитьаботурбуєнабрякРетинованітадистопованізубиможутьвикликатиускладнення.mp4')
out_dir = Path('/home/ubuntu/webdev-static-assets/yuliia-video-frames')
out_dir.mkdir(parents=True, exist_ok=True)

cap = cv2.VideoCapture(str(source))
if not cap.isOpened():
    raise SystemExit('Could not open video')
frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
fps = cap.get(cv2.CAP_PROP_FPS) or 25
length = frames / fps if frames else 0
indices = sorted(set([int(frames * p) for p in (0.15, 0.35, 0.55, 0.75, 0.9)]))
for number, index in enumerate(indices, start=1):
    cap.set(cv2.CAP_PROP_POS_FRAMES, index)
    ok, frame = cap.read()
    if ok:
        cv2.imwrite(str(out_dir / f'yuliia_frame_{number}.jpg'), frame, [int(cv2.IMWRITE_JPEG_QUALITY), 95])
cap.release()
print(f'frames={frames} fps={fps:.2f} duration={length:.2f}s output={out_dir}')
