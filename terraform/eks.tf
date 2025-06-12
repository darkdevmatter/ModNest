# module "eks" {
#   source          = "terraform-aws-modules/eks/aws"
#   version         = "20.8.3"

#   cluster_name    = "modnest-ddm"
#   cluster_version = "1.29"
#   subnet_ids      = module.vpc.private_subnets
#   vpc_id          = module.vpc.vpc_id

#   eks_managed_node_group_defaults = {
#     instance_types = ["t3.medium"]
#     tags = {
#       Name = "eks-modnest-ddm-node"
#       Cluster = "modnest-ddm"
#       Environment = "dev"
#     }
#   }

#   eks_managed_node_groups = {
#     default = {
#       desired_size = 2
#       max_size     = 3
#       min_size     = 1
#     }
#   }

#   tags = {
#     Terraform = "true"
#     Environment = "dev"
#     Name = "modnest-ddm"
#   }
# }