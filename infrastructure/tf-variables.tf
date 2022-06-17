# variable "cloud_init_master" {}

variable "external_gateway" {
  type        = string
  description = "."
}

variable "key_path" {
  type        = string
  description = ""
}

variable "key_pair" {
  type        = string
  description = ""
}

variable "server_create_timeout" {
  type        = string
  description = ""
}

variable "server_delete_timeout" {
  type        = string
  description = ""
}

variable "k8_port" {
  type        = number
  description = ""
}
