GITHUB_TOKEN:=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
GITHUB_CLIENT_ID:=497b0bb493c32262dbb6
GITHUB_CLIENT_SECRET:=f8e5acdce6ddb339c380390f9df7699fe09c617e
# AWS_ACCESS_KEY_ID:=3CE3MACaxE0gLlzY
# AWS_SECRET_ACCESS_KEY:=ueuRFY5EqQ2wb8koyhGtfLmfNYJOxgx3


setup s:
	nvm use v18

run r:
	GITHUB_TOKEN=$(GITHUB_TOKEN) \
	GITHUB_CLIENT_ID=$(GITHUB_CLIENT_ID) \
	GITHUB_CLIENT_SECRET=$(GITHUB_CLIENT_SECRET) \
		yarn dev