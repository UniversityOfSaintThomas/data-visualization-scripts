#!/usr/bin/env python3
"""Entry point executed by CodeBuild on demand (``python3 src/main.py``).

Hello-world baseline. The Cascade CMS publishing logic is added later.
Uses only the Python standard library.
"""

import logging
import sys

# Use a logger instead of print() so output shows up reliably in CodeBuild /
# CloudWatch logs regardless of how the host filters stdout.
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("cascade-publisher")


def main() -> int:
    """Run the on-demand job. Returns the process exit code (0 = success)."""
    logger.info("Hello world from CodeBuild!")
    return 0


if __name__ == "__main__":
    sys.exit(main())
