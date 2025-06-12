output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "private_subnets" {
  description = "List of private subnet IDs"
  value       = module.vpc.private_subnets
}

output "public_subnets" {
  description = "List of public subnet IDs"
  value       = module.vpc.public_subnets
}

# output "cluster_name" {
#   description = "EKS cluster name"
#   value       = module.eks.cluster_name
# }

# output "cluster_endpoint" {
#   description = "EKS cluster endpoint"
#   value       = module.eks.cluster_endpoint
# }

# output "cluster_certificate_authority_data" {
#   description = "EKS cluster certificate authority data"
#   value       = module.eks.cluster_certificate_authority_data
# }

# output "kubeconfig" {
#   description = "EKS cluster kubeconfig"
#   value       = module.eks.kubeconfig
# }

# output "node_group_role_arn" {
#   description = "ARN of EKS node group IAM role"
#   value       = module.eks.eks_managed_node_groups["default"].iam_role_arn
# }

# # output "efs_id" {
#   description = "EFS File System ID"
#   value       = module.efs.id
# }

# output "efs_mount_targets" {
#   description = "EFS Mount Target IDs"
#   value       = module.efs.mount_targets
# }

# output "efs_dns_name" {
#   description = "EFS DNS Name"
#   value       = module.efs.dns_name
# }