"""Service stubs. Swap get_key_from_ssm() for a real SSM call later."""

import os


def get_key_from_ssm(param_name: str = "CASCADE_API_KEY") -> str:
    # TODO: fetch from AWS SSM Parameter Store. For now, read an env var.
    return os.environ.get(param_name, "REPLACE_ME_WITH_SSM_VALUE")


def get_key() -> str:
    return get_key_from_ssm()
