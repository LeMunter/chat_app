# Create a ssh config
resource "local_file" "ssh_config_template" {
  content = templatefile("./templates/ssh_config.tmpl", {
    master_ip = openstack_compute_floatingip_associate_v2.associate-master-fip.floating_ip,
    key_path  = var.key_path
  })
  filename = pathexpand("./ssh_config")
}

#Create a vars file
resource "local_file" "vars_template" {
  content = templatefile("./templates/vars.tmpl", {
    master_ip = openstack_compute_floatingip_associate_v2.associate-master-fip.floating_ip,
    node_ips  = openstack_compute_instance_v2.kube-node-server.*.access_ip_v4,
    lb_ip     = openstack_networking_floatingip_v2.lb-fip.address,
    nfs_ips   = openstack_compute_instance_v2.nfs-server.*.access_ip_v4,
    master_ip  = openstack_compute_floatingip_associate_v2.associate-master-fip.floating_ip,
    k8_port = var.k8_port,
  })
  filename = pathexpand("./inventory/group_vars/all/tf_vars.yml")
}
