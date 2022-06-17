# Configure network
resource "openstack_networking_network_v2" "prod-network" {
  name           = "prod-network"
  admin_state_up = "true"
}

# Configure subnet
resource "openstack_networking_subnet_v2" "prod-subnet" {
  name       = "prod-subnet"
  network_id = openstack_networking_network_v2.prod-network.id
  cidr       = "172.168.199.0/24"
  ip_version = 4
}

# Configure router
resource "openstack_networking_router_v2" "prod-router" {
  name                = "prod-router"
  admin_state_up      = true
  external_network_id = var.external_gateway
}

# Connect subnet to router
resource "openstack_networking_router_interface_v2" "prod-router_interface" {
  router_id = openstack_networking_router_v2.prod-router.id
  subnet_id = openstack_networking_subnet_v2.prod-subnet.id
}


## Floating IPs

# Provision floating ip to be used for kube master server
resource "openstack_networking_floatingip_v2" "kube-master-fip" {
  pool = "public"
}


# Add floating ip to master-server instance
resource "openstack_compute_floatingip_associate_v2" "associate-master-fip" {
  floating_ip = openstack_networking_floatingip_v2.kube-master-fip.address
  instance_id = openstack_compute_instance_v2.kube-master-server.id
}
