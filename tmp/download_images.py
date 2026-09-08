import urllib.request, json, os, subprocess

os.makedirs("public/assets/projects/storefront", exist_ok=True)
os.makedirs("public/assets/projects/settings", exist_ok=True)
os.makedirs("public/assets/projects/promote-apps", exist_ok=True)

def download_case_images(json_path, target_dir):
    with open(json_path) as f:
        data = json.load(f)
    blocks = data.get("recordMap", {}).get("block", {})
    
    img_items = []
    for bid, bwrap in blocks.items():
        val = bwrap.get("value", {}).get("value", {})
        if val.get("type") == "image":
            src = val.get("properties", {}).get("source", [[None]])[0][0]
            if src and "prod-files-secure" in src:
                clean_name = src.split("/")[-1].split("?")[0]
                img_items.append({"bid": bid, "src": src, "name": clean_name})
                
    if not img_items:
        return
        
    print(f"Requesting {len(img_items)} signed URLs for {target_dir}...")
    req_body = json.dumps({
        "urls": [{"url": item["src"], "permissionRecord": {"table": "block", "id": item["bid"]}} for item in img_items]
    }).encode("utf-8")
    
    req = urllib.request.Request(
        "https://www.notion.so/api/v3/getSignedFileUrls",
        data=req_body,
        headers={"Content-Type": "application/json", "User-Agent": "Mozilla/5.0"}
    )
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        signed = res.get("signedUrls", [])
        
    for i, s_url in enumerate(signed):
        if not s_url:
            continue
        item = img_items[i]
        file_name = item["name"]
        out_raw = f"/tmp/{file_name}"
        base_name = os.path.splitext(file_name)[0]
        out_webp = f"{target_dir}/{base_name}.webp"
        
        try:
            dl_req = urllib.request.Request(s_url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(dl_req) as dl_resp:
                with open(out_raw, "wb") as f:
                    f.write(dl_resp.read())
            subprocess.run(["convert", out_raw, "-resize", "1600x1600>", "-quality", "88", out_webp], check=True)
            print(f"Saved: {out_webp}")
        except Exception as e:
            print(f"Failed {file_name}: {e}")

download_case_images("/tmp/case1_full.json", "public/assets/projects/storefront")
download_case_images("/tmp/case2_full.json", "public/assets/projects/settings")
download_case_images("/tmp/case3_full.json", "public/assets/projects/promote-apps")
print("All case images processed successfully!")
