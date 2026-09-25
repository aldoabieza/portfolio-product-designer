import os

png_magic = b'\x89PNG\r\n\x1a\n'
iend_magic = b'IEND\xaeB\x60\x82'

print('Scanning process memory...')
for pid in os.listdir('/proc'):
    if not pid.isdigit():
        continue
    try:
        with open(f'/proc/{pid}/cmdline', 'rb') as f:
            cmd = f.read().decode('utf-8', errors='ignore')
            if 'node' not in cmd and 'vite' not in cmd and 'nginx' not in cmd:
                continue
    except:
        continue

    print(f'Checking pid {pid} ({cmd[:40]})...')
    try:
        with open(f'/proc/{pid}/maps', 'r') as f:
            maps = f.readlines()
        with open(f'/proc/{pid}/mem', 'rb', 0) as mem:
            for line in maps:
                parts = line.split()
                if len(parts) < 6:
                    continue
                perms = parts[1]
                if not perms.startswith('r'):
                    continue
                start, end = [int(x, 16) for x in parts[0].split('-')]
                if end - start > 150 * 1024 * 1024:
                    continue
                try:
                    mem.seek(start)
                    chunk = mem.read(end - start)
                    idx = 0
                    while True:
                        idx = chunk.find(png_magic, idx)
                        if idx == -1:
                            break
                        end_idx = chunk.find(iend_magic, idx)
                        if end_idx != -1:
                            length = (end_idx + len(iend_magic)) - idx
                            if 115000 <= length <= 125000:
                                print(f'Found candidate PNG in pid {pid} size {length}!')
                                with open(f'/tmp/recovered_{length}_{pid}.png', 'wb') as out:
                                    out.write(chunk[idx:idx+length])
                        idx += 8
                except:
                    pass
    except Exception as e:
        pass

print('Done scanning mem.')
