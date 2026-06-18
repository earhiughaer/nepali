from pathlib import Path
import re
import sys

INPUT = Path("alphabet/alphabet.mp3")
OUT_DIR = Path("alphabet/letters")

LETTERS = [
    ("क", "ka"),
    ("ख", "kha"),
    ("ग", "ga"),
    ("घ", "gha"),
    ("ङ", "nga"),
    ("च", "tscha"),
    ("छ", "tschha"),
    ("ज", "dscha"),
    ("झ", "dschha"),
    ("ञ", "nja"),
    ("ट", "ta_retroflex"),
    ("ठ", "tha_retroflex"),
    ("ड", "da_retroflex"),
    ("ढ", "dha_retroflex"),
    ("ण", "na_retroflex"),
    ("त", "ta"),
    ("थ", "tha"),
    ("द", "da"),
    ("ध", "dha"),
    ("न", "na"),
    ("प", "pa"),
    ("फ", "pha"),
    ("ब", "ba"),
    ("भ", "bha"),
    ("म", "ma"),
    ("य", "ja"),
    ("र", "ra"),
    ("ल", "la"),
    ("व", "wa"),
    ("श", "scha"),
    ("ष", "scha_retroflex"),
    ("स", "sa"),
    ("ह", "ha"),
    ("क्ष", "kscha"),
    ("त्र", "tra"),
    ("ज्ञ", "gya"),
]

BITRATES = {
    0b0001: 32, 0b0010: 40, 0b0011: 48, 0b0100: 56,
    0b0101: 64, 0b0110: 80, 0b0111: 96, 0b1000: 112,
    0b1001: 128, 0b1010: 160, 0b1011: 192, 0b1100: 224,
    0b1101: 256, 0b1110: 320,
}
SAMPLE_RATES = {0b00: 44100, 0b01: 48000, 0b10: 32000}


def parse_regions(path: Path):
    regions = []
    for line in path.read_text().splitlines():
        match = re.match(r"^\d+\s+([0-9.]+)\s+([0-9.]+)$", line.strip())
        if match:
            regions.append((float(match.group(1)), float(match.group(2))))
    return regions


def parse_frames(data: bytes):
    frames = []
    pos = 0
    if data[:3] == b"ID3" and len(data) >= 10:
        size = 0
        for b in data[6:10]:
            size = (size << 7) | (b & 0x7F)
        pos = 10 + size

    while pos + 4 <= len(data):
        header = int.from_bytes(data[pos:pos + 4], "big")
        if (header & 0xFFE00000) != 0xFFE00000:
            pos += 1
            continue
        version = (header >> 19) & 0b11
        layer = (header >> 17) & 0b11
        bitrate_idx = (header >> 12) & 0b1111
        sample_idx = (header >> 10) & 0b11
        padding = (header >> 9) & 1
        if version != 0b11 or layer != 0b01 or bitrate_idx not in BITRATES or sample_idx not in SAMPLE_RATES:
            pos += 1
            continue
        bitrate = BITRATES[bitrate_idx] * 1000
        sample_rate = SAMPLE_RATES[sample_idx]
        frame_len = int((144 * bitrate) // sample_rate + padding)
        if frame_len <= 4 or pos + frame_len > len(data):
            break
        frames.append((pos, pos + frame_len, len(frames) * 1152 / sample_rate, (len(frames) + 1) * 1152 / sample_rate))
        pos += frame_len
    return frames


def nearest_frame_index(frames, time_s: float):
    best = min(range(len(frames)), key=lambda i: abs(frames[i][2] - time_s))
    return best


def main():
    regions_path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("alphabet/regions.txt")
    lead_trim = float(sys.argv[2]) if len(sys.argv) > 2 else 0.0
    tail_trim = float(sys.argv[3]) if len(sys.argv) > 3 else 0.0
    regions = parse_regions(regions_path)
    if len(regions) != len(LETTERS):
        raise SystemExit(f"Expected {len(LETTERS)} regions, got {len(regions)}")

    data = INPUT.read_bytes()
    frames = parse_frames(data)
    if not frames:
        raise SystemExit("No MPEG frames found")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest = []
    for idx, ((letter, label), (start, end)) in enumerate(zip(LETTERS, regions), start=1):
        adjusted_start = max(0.0, start + lead_trim)
        adjusted_end = max(adjusted_start, end - tail_trim)
        start_idx = nearest_frame_index(frames, adjusted_start)
        end_idx = nearest_frame_index(frames, adjusted_end)
        end_idx = min(len(frames) - 1, max(start_idx, end_idx))
        start_byte = frames[start_idx][0]
        end_byte = frames[end_idx][1]
        filename = f"{idx:02d}_{label}_{letter}.mp3"
        out = OUT_DIR / filename
        out.write_bytes(data[start_byte:end_byte])
        manifest.append(f"{idx:02d}\t{letter}\t{label}\t{adjusted_start:.3f}\t{adjusted_end:.3f}\t{filename}")

    (OUT_DIR / "manifest.tsv").write_text("nr\tzeichen\tdeutsche_lautschrift\tstart\tende\tdatei\n" + "\n".join(manifest) + "\n")
    print(f"Wrote {len(LETTERS)} files to {OUT_DIR}")


if __name__ == "__main__":
    main()
