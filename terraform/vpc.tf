module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.1.2"

  name = "ddm-modnest-vpc"
  cidr = "10.0.0.0/16"

  azs               = ["us-east-1a", "us-east-1b", "us-east-1c"]

  public_subnets    = ["10.0.101.0/24"]
  private_subnets   = ["10.0.1.0/24"]
  database_subnets  = ["10.0.201.0/24", "10.0.202.0/24"]

  public_subnet_names    = ["modnest-public-1a"]
  private_subnet_names   = ["modnest-private-1b"]
  database_subnet_names  = ["modnest-data-1c", "modnest-data-1b"]

  enable_nat_gateway     = true
  single_nat_gateway     = true

  enable_dns_hostnames = true
  enable_dns_support   = true

  public_route_table_tags = {
    Name    = "public-rt"
    Purpose = "Public subnet routing (IGW)"
  }

  private_route_table_tags = {
    Name    = "private-rt"
    Purpose = "Private subnet routing (NAT GW)"
  }

  database_route_table_tags = {
    Name    = "database-rt"
    Purpose = "Database subnet routing (private, no IGW)"
  }

  tags = {
    Terraform   = "true"
    Environment = "dev"
    Name        = "ddm-modnest-vpc"
  }
}