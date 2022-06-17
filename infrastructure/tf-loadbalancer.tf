
resource "openstack_lb_loadbalancer_v2" "lb" {
  vip_subnet_id = openstack_networking_subnet_v2.prod-subnet.id
  security_group_ids = [
    openstack_networking_secgroup_v2.web_secgroup.id
  ]
}

resource "openstack_lb_pool_v2" "lb_pool" {
  protocol    = "HTTP"
  lb_method   = "ROUND_ROBIN"
  listener_id = openstack_lb_listener_v2.listener_1.id
}

resource "openstack_lb_listener_v2" "listener_1" {
  protocol        = "HTTP"
  protocol_port   = 80
  loadbalancer_id = openstack_lb_loadbalancer_v2.lb.id

  insert_headers = {
    X-Forwarded-For = "true"
  }
}

resource "openstack_lb_monitor_v2" "monitor" {
  pool_id     = openstack_lb_pool_v2.lb_pool.id
  type        = "TCP"
  delay       = 20
  timeout     = 10
  max_retries = 5
}

resource "openstack_lb_member_v2" "member" {
  count         = length(openstack_compute_instance_v2.kube-node-server.*.access_ip_v4)
  pool_id       = openstack_lb_pool_v2.lb_pool.id
  address       = openstack_compute_instance_v2.kube-node-server[count.index].access_ip_v4
  protocol_port = var.k8_port
  subnet_id     = openstack_networking_subnet_v2.prod-subnet.id
}

resource "openstack_networking_floatingip_v2" "lb-fip" {
  pool = "public"
}

resource "openstack_networking_floatingip_associate_v2" "associate-lb-fip" {
  depends_on = [
    openstack_networking_router_interface_v2.prod-router_interface
  ]
  floating_ip = openstack_networking_floatingip_v2.lb-fip.address
  port_id     = openstack_lb_loadbalancer_v2.lb.vip_port_id
}
