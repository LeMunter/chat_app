# Configure security group db_secgroup and rules
resource "openstack_networking_secgroup_v2" "db_secgroup" {
  name = "db_secgroup"
}

resource "openstack_networking_secgroup_rule_v2" "db_secgroup_rule_1" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 5432
  port_range_max    = 5432
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.db_secgroup.id
}

resource "openstack_networking_secgroup_rule_v2" "db_secgroup_rule_2" {
  direction         = "egress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 5432
  port_range_max    = 5432
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.db_secgroup.id
}

# Configure security group ssh_secgroup and rules
resource "openstack_networking_secgroup_v2" "ssh_secgroup" {
  name = "ssh_secgroup"
}

resource "openstack_networking_secgroup_rule_v2" "ssh_secgroup_rule_1" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 22
  port_range_max    = 22
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.ssh_secgroup.id
}


# Configure security group web_secgroup and rules
resource "openstack_networking_secgroup_v2" "web_secgroup" {
  name = "web_secgroup"
}

resource "openstack_networking_secgroup_rule_v2" "web_secgroup_rule_1" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 80
  port_range_max    = 80
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.web_secgroup.id
}

resource "openstack_networking_secgroup_rule_v2" "web_secgroup_rule_2" {
  direction         = "egress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 80
  port_range_max    = 80
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.web_secgroup.id
}

resource "openstack_networking_secgroup_rule_v2" "web_secgroup_rule_3" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 443
  port_range_max    = 443
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.web_secgroup.id
}

resource "openstack_networking_secgroup_rule_v2" "web_secgroup_rule_4" {
  direction         = "egress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 443
  port_range_max    = 443
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.web_secgroup.id
}

# Configure security group k8_api and rules
resource "openstack_networking_secgroup_v2" "k8_api" {
  name = "k8_api"
}

resource "openstack_networking_secgroup_rule_v2" "k8_api" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 6443
  port_range_max    = 6443
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.k8_api.id
}


# Configure security group proxy_secgroup and rules
resource "openstack_networking_secgroup_v2" "proxy_secgroup" {
  name = "proxy_secgroup"
}

resource "openstack_networking_secgroup_rule_v2" "proxy_rule" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 32162
  port_range_max    = 32162
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.proxy_secgroup.id
}
