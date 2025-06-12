terraform {
  backend "s3" {
    bucket         = "terraformddmstate"
    key            = "modnest/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
  }
}