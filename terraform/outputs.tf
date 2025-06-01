output "cluster_name" {
  description = "EKS cluster name"
  value       = module.eks.cluster_name
}

output "kubeconfig" {
  description = "EKS cluster kubeconfig"
  value       = module.eks.kubeconfig
}

output "efs_id" {
  description = "EFS File System ID"
  value       = module.efs.id
}