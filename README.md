# Solana Jupiter Address Detector

Chrome extension that scans any web page for Solana addresses and injects a “Trade in Jupiter” button for one‑click swaps via Jupiter Aggregator.

## Overview

This extension automates detection of Solana public keys (32–44 base58 characters) in page text and appends a styled button next to each address to open Jupiter’s swap interface in a new tab. It runs on initial load and monitors for dynamically inserted content.

## Features

- **Automatic scanning** of all text nodes for Solana addresses.
- **Dynamic updates**: handles content added after page load via MutationObserver.
- **Instant action**: injects a “Trade in Jupiter” button beside each detected address.
- **Clear styling**: white background, black border & text, rounded corners, hover‑ready cursor.

## Installation

1. Clone or download this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/solana-jupiter-detector.git

	2.	Open Chrome and navigate to chrome://extensions/.
	3.	Enable Developer mode (toggle in top‑right corner).
	4.	Click Load unpacked and select the project’s folder.
	5.	Ensure the extension is enabled in your list.

Usage
	1.	Navigate to any website containing Solana addresses.
	2.	The extension will automatically detect addresses and append a “Trade in Jupiter” button.
	3.	Click the button to open the Jupiter swap interface for that token in a new tab.

Configuration
	•	Regex pattern: adjust solanaAddressRegex in content.js to tweak address matching.
	•	Button styling: modify button.style.* properties in content.js to change appearance.
	•	Swap URL: edit the URL template in the button.addEventListener callback if you need a different Jupiter endpoint.

Contributing
	1.	Fork the repository and create a feature branch:

git checkout -b feature/your-feature-name

	2.	Commit your changes with clear messages.
	3.	Push to your fork and submit a pull request describing your improvements or fixes.

[https://buymeacoffee.com/lopseg](https://buymeacoffee.com/lopseg)
