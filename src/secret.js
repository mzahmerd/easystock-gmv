const Credentials = {
  // remote_url: "http://localhost:5984/",
  remote_url: "http://admin:gmv@35.232.34.36:5984/",
  // remote_url: "http://username:password@host:port/databasename",
  // remote_url: "http://35.232.34.36:5984/",
};

// Bitnami Creds.
// Admin user:
// admin
// Admin password (Temporary):
// AZ4oqs16w8oU
// Instance:
// gmv-vm
// Instance zone:
// us-central1-f
// Instance machine type:
// f1-micro

// generate SSH key:
// http://www.macworld.co.uk/how-to/mac-software/how-generate-ssh-keys-3521606/
// $ ssh-keygen
// Your identification has been saved in /home/mz_ahmad/.ssh/id_rsa
// Your public key has been saved in /home/mz_ahmad/.ssh/id_rsa.pub
// The key fingerprint is:
// SHA256:hljLD3Elu3Oy9UM8XkVOxBsrCy8isRyevX7eVnWa+VQ mz_ahmad@pop-os

// ssh-add KEYFILE
// subject=C = NG, ST = Gombe, O = Internet Widgits Pty Ltd, CN = gmv-vm, emailAddress = gomtechsolutions@gmail.com
// file=/opt/bitnami/couchdb/var/log/couch.log

// Country Name (2 letter code) [AU]:NG
// State or Province Name (full name) [Some-State]:Gombe
// Locality Name (eg, city) []:Gombe
// Organization Name (eg, company) [Internet Widgits Pty Ltd]:GomTech Solutions
// Organizational Unit Name (eg, section) []:Dev
// Common Name (e.g. server FQDN or YOUR name) []:dev.gomtech.ng
// Email Address []:gomtechsolutions@gmail.com
// Please enter the following 'extra' attributes
// to be sent with your certificate request
// A challenge password []:@Gomtech1
// An optional company name []:Gomtech Solutions
// subject=C = NG, ST = Gombe, L = Gombe, O = GomTech Solutions, OU = Dev, CN = dev.gomtech.ng, emailAddress = gomtech
// solutions@gmail.com
export default Credentials;
