#!/usr/bin/env python3
"""Upsert (overwrite) campaign_standing.json into a Cascade CMS folder."""

import json
import logging
import os
import sys
import urllib.parse
import urllib.request

from utils.services import get_key

# --- Hardcoded config (edit here) ------------------------------------------
HERE = os.path.dirname(os.path.abspath(__file__))
LOCAL_FILE = os.path.join(HERE, "utils", "campaign_standing.json")

BASE_URL = "https://stthomas.cascadecms.com"
SITE_NAME = "Give"
PARENT_FOLDER_PATH = "_media-library/documents/comprehensive-campaign"
FILE_NAME = "campaign_standing.json"
ASSET_PATH = f"{PARENT_FOLDER_PATH}/{FILE_NAME}"
TIMEOUT = 30

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("cascade-publisher")


def call(method, url, auth, payload=None): # method to keep the main script lean
    data = json.dumps(payload).encode() if payload else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", auth)
    req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        return json.loads(r.read().decode())


def main() -> int:
    log.info("Cascade publisher starting.")

    text = open(LOCAL_FILE, encoding="utf-8").read()
    json.loads(text)  # fail fast if the local file isn't valid JSON

    auth = "Bearer " + get_key()

    # Find the existing file so we overwrite it instead of creating a duplicate.
    read_url = f"{BASE_URL}/api/v1/read/file/{SITE_NAME}/{urllib.parse.quote(ASSET_PATH)}"
    asset_id = call("GET", read_url, auth).get("asset", {}).get("file", {}).get("id")

    file_asset = {
        "name": FILE_NAME,
        "parentFolderPath": PARENT_FOLDER_PATH,
        "siteName": SITE_NAME,
        "text": text,
    }

    if asset_id:
        log.info("Overwriting existing asset %s", asset_id)
        file_asset["id"] = asset_id
        result = call("POST", f"{BASE_URL}/api/v1/edit", auth, {"asset": {"file": file_asset}})
    else:
        log.info("No existing file; creating a new one.")
        result = call("POST", f"{BASE_URL}/api/v1/create", auth, {"asset": {"file": file_asset}})

    if result.get("success"):
        log.info("Done. createdAssetId=%s", result.get("createdAssetId", "(edit)"))
        return 0

    log.error(json.dumps({"error": "cascade_failed", "message": result.get("message")}))
    return 1


if __name__ == "__main__":
    sys.exit(main())
