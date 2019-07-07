workflow "build deploy push" {
  on = "push"
  resolves = ["GitHub Action for AWS"]
}

action "install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["install"]
  args = "run-script build"
}

action "GitHub Action for AWS" {
  uses = "actions/aws/cli@efb074ae4510f2d12c7801e4461b65bf5e8317e6"
  needs = ["build"]
  secrets = ["AWS_ACCESS_KEY", "AWS_SECRET_ACCESS_KEY"]
  args = "s3 sync dist/ s3://set.wieffering.io/"
}
