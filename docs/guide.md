


# ModNest Deployment & Operations Guide

This guide outlines the high-level steps for deploying and operating ModNest's infrastructure on AWS using Terraform, Kubernetes, and modern DevOps practices. We will expand and refine this as we go.

---

## 1. Provision AWS Infrastructure

- Set up AWS account and billing.
- Use Terraform to provision:
  - VPC, subnets, and security groups
  - EKS cluster (control plane and node groups)
  - EFS filesystem (for persistent game storage)
  - S3 bucket for Terraform state

---

## 2. Verify Resources

- Check EKS cluster is healthy (`aws eks describe-cluster ...` or AWS Console)
- Confirm node group status is "active"
- Validate EFS filesystem and mount targets are "available"

---

## 3. Configure Kubernetes Access

- Update local kubeconfig:
  ```bash
  aws eks update-kubeconfig --region us-east-1 --name <your-cluster-name>
  ```
- Test with:
  ```bash
  kubectl get nodes
  ```

---

## 4. Set Up EFS CSI Driver

- Install EFS CSI Driver on EKS:
  ```bash
  kubectl apply -k "github.com/kubernetes-sigs/aws-efs-csi-driver/deploy/kubernetes/overlays/stable/ecr/?ref=release-1.7"
  ```
  - (Alternatively, install with Helm.)

---

## 5. Create EFS StorageClass, PV, and PVC

- Define StorageClass pointing to EFS CSI Driver
- Create PersistentVolume (PV) and PersistentVolumeClaim (PVC) for workloads

---

## 6. Build or Select Minecraft Server Images

- Use community images like `itzg/docker-minecraft-server` or build custom images
- Push to a container registry if needed (ECR, Docker Hub, etc.)

---

## 7. Write & Apply Kubernetes Manifests

- Create `Deployment` or `StatefulSet` for each Minecraft server
- Reference the EFS-backed PVC for persistent world data
- Create Services (NodePort, LoadBalancer, etc.) for access

---

## 8. Expose Minecraft Servers

- Use AWS LoadBalancer (via Service type `LoadBalancer`) for internet access
- Set up Ingress resources and AWS Load Balancer Controller if needed

---

## 9. Secure the Cluster

- Apply network policies for isolation
- Use IAM roles for service accounts (IRSA) for AWS permissions in pods
- Adjust security groups as needed

---

## 10. Monitoring & Logging

- Enable CloudWatch Container Insights for EKS
- Deploy Prometheus, Grafana, Metrics Server, etc. for deeper insights
- Aggregate logs for audit and troubleshooting

---

## 11. (Optional) Set Up CI/CD

- Use GitHub Actions, CodePipeline, etc. for automated deployments

---

## 12. Ongoing Operations

- Monitor costs in AWS billing dashboard
- Review resource utilization and scale as needed
- Keep Kubernetes and Minecraft server images updated
- Backup EFS and critical data

---

*We will fill out and expand each section as we build and iterate!*