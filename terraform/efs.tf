# module "efs" {
#   source  = "terraform-aws-modules/efs/aws"
#   version = "1.7.0"
#   name    = "modnest-ddm-efs"

#   mount_targets = {
#     for subnet in module.vpc.private_subnets : subnet => { subnet_id = subnet }
#   }

#   create_security_group = true

# #   aws_security_group = {
# #     vpc_id = module.vpc.vpc_id
# #     # You can add custom rules here if needed
# #   }

#   tags = {
#     Terraform   = "true"
#     Environment = "dev"
#     Name        = "modnest-ddm-efs"
#   }
# }