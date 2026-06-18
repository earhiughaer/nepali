from pathlib import Path
import sys

INPUT = Path("alphabet/numbers.mp3")
OUT_DIR = Path("alphabet/numbers")

NUMBERS = [
    ("०", "sunja"),
    ("१", "ek"),
    ("२", "dui"),
    ("३", "tin"),
    ("४", "tschar"),
    ("५", "pantsch"),
    ("६", "tschha"),
    ("७", "sat"),
    ("८", "aath"),
    ("९", "nau"),
]

BITRATES = {
    0b0001: 32, 0b0010: 40, 0b0011: 48, 0b0100: 56,
    0b0101: 64, 0b0110: 80, 0b0111: 96, 0b1000: 112,
    0b1001: 128, 0b1010: 160, 0b1011: 192, 0b1100: 224,
    0b1101: 256, 0b1110: 320,
}
SAMPLE_RATES = {0b00: 44100, 0b01: 48000, 0b10: 32000}


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
    return min(range(len(frames)), key=lambda i: abs(frames[i][2] - time_s))


def main():
    duration = float(sys.argv[1]) if len(sys.argv) > 1 else 8.829375
    lead_trim = float(sys.argv[2]) if len(sys.argv) > 2 else 0.0
    tail_trim = float(sys.argv[3]) if len(sys.argv) > 3 else 0.0
    regions = [(i * duration / len(NUMBERS), (i + 1) * duration / len(NUMBERS)) for i in range(len(NUMBERS))]
    data = INPUT.read_bytes()
    frames = parse_frames(data)
    if not frames:
        raise SystemExit("No MPEG frames found")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest = []
    for idx, ((digit, label), (start, end)) in enumerate(zip(NUMBERS, regions)):
        adjusted_start = max(0.0, start + lead_trim)
        adjusted_end = max(adjusted_start, end - tail_trim)
        start_idx = nearest_frame_index(frames, adjusted_start)
        end_idx = nearest_frame_index(frames, adjusted_end)
        end_idx = min(len(frames) - 1, max(start_idx, end_idx))
        filename = f"{idx:02d}_{label}_{digit}.mp3"
        (OUT_DIR / filename).write_bytes(data[frames[start_idx][0]:frames[end_idx][1]])
        manifest.append(f"{idx}\t{digit}\t{label}\t{adjusted_start:.3f}\t{adjusted_end:.3f}\t{filename}")

    (OUT_DIR / "manifest.tsv").write_text("zahl\tzeichen\tdeutsche_lautschrift\tstart\tende\tdatei\n" + "\n".join(manifest) + "\n")
    print(f"Wrote {len(NUMBERS)} files to {OUT_DIR}")


if __name__ == "__main__":
    main()
