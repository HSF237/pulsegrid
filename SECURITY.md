# Security Policy

Please use GitHub's private vulnerability reporting feature for security issues when available rather than publishing sensitive details in a public issue.

PulseGrid uses environment variables for Firebase web configuration. Never commit service-account credentials, private keys or privileged tokens. Firestore Security Rules, not client-side UI checks, must enforce authorization.
