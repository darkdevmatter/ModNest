


variable "public_subnet_names" {
  description = "Names for the public subnets"
  type        = list(string)
  default     = ["modnest-public-1a", "modnest-public-1b"]
}

variable "private_subnet_names" {
  description = "Names for the private subnets"
  type        = list(string)
  default     = ["modnest-private-1a", "modnest-private-1b"]
}

variable "database_subnet_names" {
  description = "Names for the database subnets"
  type        = list(string)
  default     = ["modnest-data-1a", "modnest-data-1b"]
}