import { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'Cloud Security Misconfigurations | AWS & Azure Tutorial | Zentrion',
  description: 'Learn how to audit AWS and Azure for security misconfigurations. Test S3 buckets, IAM roles, NSGs, and Entra ID in safe CloudGoat practice labs.',
  keywords: 'cloud security, aws security, azure security, s3 bucket misconfiguration, cloudgoat tutorial, iam roles',
};

export default function CloudSecurityTutorialPage() {
  return (
    <GuideLayout
      title="Cloud Security – AWS & Azure Misconfigurations"
      description="90% of cloud breaches are caused by misconfigurations, not zero-days. Learn how to audit AWS and Azure environments for exposed storage, overly permissive IAM roles, and open security groups."
      timeToRead="30 min read"
      lastUpdated="September 2026"
      tags={['Cloud Security', 'AWS', 'Azure']}
      tools={[
        { name: 'Subdomain Finder', url: '/tools/subdomain-finder' }
      ]}
      relatedGuides={[
        { title: 'Home SOC Setup', url: '/guides/home-soc-setup' },
        { title: 'Linux Privilege Escalation', url: '/guides/linux-privilege-escalation' }
      ]}
      headings={[
        { id: 'aws-s3', label: 'AWS: S3 Bucket Security' },
        { id: 'aws-iam', label: 'AWS: IAM Misconfigurations' },
        { id: 'aws-ec2', label: 'AWS: EC2 & Networking' },
        { id: 'azure', label: 'Azure Security Checks' },
        { id: 'cloudgoat', label: 'Practice Lab: CloudGoat' }
      ]}
    >
      <h2 id="aws-s3">AWS: S3 Bucket Security</h2>
      <p>Exposed S3 buckets are responsible for some of the largest data breaches in history. When conducting an audit, always check for public read/write access.</p>
      
      <pre><code>{`# 1. Enumerate and discover public buckets (Using open-source s3scanner)
s3scan -f /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt

# 2. Check the Access Control List (ACL) of a specific bucket
aws s3api get-bucket-acl --bucket example-bucket

# 3. Check if the bucket has Public Access Block enabled
aws s3api get-bucket-public-access-block --bucket example-bucket

# 4. If public, list the contents
aws s3 ls s3://example-bucket --recursive`}</code></pre>

      <h2 id="aws-iam">AWS: IAM Misconfigurations</h2>
      <p>Identity and Access Management (IAM) controls who can do what. Privilege escalation occurs when roles are overly permissive (e.g., using the <code>*</code> wildcard).</p>

      <pre><code>{`# List all IAM users
aws iam list-users

# Check for access keys older than 90 days (Security risk)
aws iam list-access-keys --user-name admin

# Check if the root account has Multi-Factor Authentication (MFA) enabled
aws iam list-mfa-devices --user-name root

# Identify overly permissive roles
aws iam list-roles --query 'Roles[?IsDefault==\`false\`].{Name:Arn}'`}</code></pre>

      <h2 id="aws-ec2">AWS: EC2 & Networking (Security Groups)</h2>
      <p>Security Groups act as a virtual firewall. A common mistake is leaving management ports (SSH/RDP) open to the entire internet (<code>0.0.0.0/0</code>).</p>

      <pre><code>{`# Find Security Groups with SSH (22) or RDP (3389) open to the world
aws ec2 describe-security-groups --query 'SecurityGroups[*].{Name:GroupName,Rules:IpPermissions[?ToPort==\`22\` || ToPort==\`3389\`]}'

# Check for unencrypted EBS (Storage) Volumes
aws ec2 describe-volumes --query 'Volumes[?Encrypted==\`false\`].VolumeId'`}</code></pre>

      <h2 id="azure">Azure Security Checks (Storage, VMs, Entra ID)</h2>
      <p>The methodology in Microsoft Azure is similar, but relies on the Azure CLI (<code>az</code>) and different terminology (Storage Accounts, NSGs, Entra ID).</p>

      <h3>Storage Accounts & Containers (Azure's S3 Equivalent)</h3>
      <pre><code>{`# List all storage accounts
az storage account list --query "[].name"

# Check for public Blob access
az storage account show --name myaccount --query "allowBlobPublicAccess"

# List containers with public access
az storage container list --account-name myaccount --query "[?publicAccess!='none'].name"`}</code></pre>

      <h3>Virtual Machines & NSGs</h3>
      <pre><code>{`# Check Network Security Groups (NSGs) for rules allowing all traffic (0.0.0.0/0) on port 22
az network nsg rule list --resource-group myrg --query "[?destinationPortRange=='22' && access=='Allow'].name"`}</code></pre>

      <h3>Entra ID (Formerly Azure AD)</h3>
      <pre><code>{`# Check for users without MFA or stale accounts (Password hasn't changed in over a year)
az ad user list --query "[?lastPasswordChangeTime<='2024-01-01'].displayName"`}</code></pre>

      <h2 id="cloudgoat">Practice Lab: CloudGoat</h2>
      <p>Do not test AWS/Azure misconfigurations on live corporate environments without permission. Instead, deploy <strong>CloudGoat</strong>.</p>
      <p>CloudGoat (by Rhino Security Labs) is a "Vulnerable by Design" AWS deployment tool. It uses Terraform to automatically deploy vulnerable cloud infrastructure into your own AWS account for you to hack.</p>

      <pre><code>{`# 1. Install CloudGoat
git clone https://github.com/RhinoSecurityLabs/cloudgoat
cd cloudgoat
pip install -r requirements.txt

# 2. Deploy a vulnerable scenario (e.g., 'iam_privesc_by_rollback')
python3 cloudgoat.py create iam_privesc_by_rollback

# 3. Practice your attacks! Find the misconfigurations and escalate privileges.

# 4. CRITICAL: Destroy the environment so you don't get billed by AWS!
python3 cloudgoat.py destroy iam_privesc_by_rollback`}</code></pre>
      
      <p>For Azure practice, check out <a href="https://github.com/418sec/flaws.cloud" target="_blank" rel="noopener noreferrer">Flaws.cloud</a> and <a href="https://github.com/Hacking-the-Cloud/hackingthe.cloud" target="_blank" rel="noopener noreferrer">Hacking the Cloud</a>.</p>
    </GuideLayout>
  );
}
