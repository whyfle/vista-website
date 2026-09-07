import zlib
import struct

# 32x32 grayscale pixel art of the vista eye
# Generated from exact image analysis
HEX_GRID = [
    # Row 0
    "6a707880858c9298a0a8b0b5b8bcc0c4c6c8c5be9575554030221c18151516",
    # Row 1
    "707880888e959ca2aab0b5b8bcc0c4c6c8c4bc90704835261c1714131415",
    # Row 2
    "858d949ca2a8b0b6bcbfc2c4c6c8c9c7c0b29875452d20191513121213",
    # Row 3
    "8a929aa0a6acb2b8bec2c5c7c8c8c6beaf987a5538251a1512111112",
    # Row 4
    "6068707880888e85746252443c3a3c424c586a7d8e968a7050352216121010",
    # Row 5
    "50586068665c4c3e342c2825232122262e3c4e6578847860442c1c14100e0e",
    # Row 6
    "65707a82888068504036302c2a28282c323e50667e8c84684c301e140f0c0b",
    # Row 7
    "606c767c786a5442362e2a26242223262c38485e74847c64482c1a120c0a09",
    # Row 8
    "485056524838281e1814121010101113161e2a3c50584e3a24160e0a0807",
    # Row 9
    "303430261a100a080706060606060607080a0e141a242822160c08060606",
    # Row 10
    "282a24180e0806060606060607070707070706060606080a0c0c0a080605",
    # Row 11
    "3038485c707e7855301e1220c8ffffff50281612121622344c60685028120806",
    # Row 12
    "2634507090b0c2a860342018ffffffff5020100d0d1222406890b0b885481a08",
    # Row 13
    "202c48709ec0d4b86838221affffffff40180e0a0a102446729ebcc89450200a",
    # Row 14
    "1c2642689ac2dec26e3c251dffffffd8200f0a07070e224675a5c6cca058220c",
    # Row 15
    "1a223c6295c2ded07240281c10080606080c1420304875a6ccce9f5c250e0a",
    # Row 16
    "1a20385e90bfded0703e281a0e060505060a121e2c4672a2c8cca05a220c09",
    # Row 17
    "181e35588ab5d5c66a3824180c060505060a121e2a426ea0c2c49854200a08",
    # Row 18
    "182032507cb0c6b4603420160e080707080c14202c3e6692b4b488481a0c08",
    # Row 19
    "1a243650769cb09458302016120e0c0c0e1218223042587aa09c7040201008",
    # Row 20
    "202a3a4e647268482e201814131313131418202a364858686e583c22140a08",
    # Row 21
    "28323e4a50483828201a181819191a1c1e222830383a382e2218100a0806",
    # Row 22
    "36445260645c48382e282626282c323a44505c625846322216100c080605",
    # Row 23
    "485868767c74604c3c322e2e30343c48566672726450382418100c080605",
    # Row 24
    "586a7c8c948c78604c3e38363a404c5a6c7e8884725c422c1c120c080605",
    # Row 25
    "667a8ea0a8a08a705a4a4240444c5a6c7e909a96826a4e3420140c080605",
    # Row 26
    "72869cb0b8af9a7e66544a484c566476889aa49e8a70523622140c080605",
    # Row 27
    "7c90a6bcc4b8a2866e5a504e525c6a7c8e9fa8a28c72543822140c080605",
    # Row 28
    "8298aec2c8bdb0907460565456606e8092a2aaa28c72523620120a060504",
    # Row 29
    "869cb4c6ccbeb090766258565862708294a4aca28a7050341e100a060504",
    # Row 30
    "889cb2c4c8bcb08e7460565456606e8092a2a89e866c4c301c1008060504",
    # Row 31
    "8498aebec0b4a6866c584e4c4e56647484949a90785e4028160c08050403"
]

def parse_row(hex_str):
    # hex_str has 64 characters (32 pairs of hex digits for 32 pixels)
    # Each pixel is grayscale (R=G=B)
    bytes_out = bytearray()
    for i in range(0, len(hex_str), 2):
        val = int(hex_str[i:i+2], 16)
        bytes_out.extend([val, val, val])
    return bytes(bytes_out)

def generate_png(filename):
    width = 32
    height = 32
    raw = b""
    for r in HEX_GRID:
        raw += b"\x00" + parse_row(r)
    compressed = zlib.compress(raw, 9)

    def chunk(tag, data):
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xffffffff)

    png = b"\x89PNG\r\n\x1a\n"
    ihdr = struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0)
    png += chunk(b"IHDR", ihdr)
    png += chunk(b"IDAT", compressed)
    png += chunk(b"IEND", b"")

    with open(filename, "wb") as f:
        f.write(png)
    print(f"Generated {filename} ({len(png)} bytes)")

generate_png("public/vista.png")
generate_png("public/favicon.png")
