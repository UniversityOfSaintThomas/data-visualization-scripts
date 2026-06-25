"""Service stubs. Swap get_key_from_ssm() for a real SSM call later."""

import os

# .env lives at the repo root (one level up from utils/).
ENV_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env")


def _read_env(key: str) -> str:
    # Prefer a real env var (e.g. CodeBuild-injected); else read it from .env.
    if os.environ.get(key):
        return os.environ[key]
    if os.path.exists(ENV_FILE):
        for line in open(ENV_FILE, encoding="utf-8"):
            if line.strip().startswith(f"{key}="):
                return line.split("=", 1)[1].strip().strip("\"'")
    return ""


def get_key_from_ssm(param_name: str = "CASCADE_API_KEY") -> str:
    # TODO: fetch from AWS SSM Parameter Store. For now, read from env / .env.
    return _read_env(param_name)


def get_key() -> str:
    return get_key_from_ssm()
