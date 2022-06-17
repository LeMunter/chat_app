output "master_ip" {
  value       = openstack_compute_floatingip_associate_v2.associate-master-fip.floating_ip
  description = ""
}

output "lb_ip" {
  value       = openstack_networking_floatingip_v2.lb-fip.address
  description = ""
}

output "nodes_ip" {
  value = {
    for instance in openstack_compute_instance_v2.kube-node-server :
    instance.name => instance.access_ip_v4
  }
}

output "nodes_ip_list" {
  value = openstack_compute_instance_v2.kube-node-server.*.access_ip_v4
}

output "nodes_name_list" {
  value = openstack_compute_instance_v2.kube-node-server.*.name
}
