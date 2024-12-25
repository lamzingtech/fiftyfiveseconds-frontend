#!/bin/bash

# Configuration
DB_NAME="dlpidb"
DB_USER="projectuser"
DB_PASSWORD="Temp1234!"
BACKUP_DIR="/root/backup-lamzing-gov-sites/backup-dlpi"
PROJECT_DIR="/var/www/dlpi/DLPI/SampleTemplate"
DATE=$(date +"%Y%m%d%H%M") # Format: YYYYMMDDHHMM

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Backup Database
DB_BACKUP_FILE="${BACKUP_DIR}/${DB_NAME}_backup_${DATE}.sql"
mysqldump -u"$DB_USER" -p"$DB_PASSWORD" -h localhost "$DB_NAME" > "$DB_BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "Database backup successfully created at $DB_BACKUP_FILE"
else
    echo "Database backup failed!" >&2
    exit 1
fi

# Backup Static and Media Files
STATIC_MEDIA_BACKUP_FILE="${BACKUP_DIR}/static_media_backup_${DATE}.tar.gz"
tar -czf "$STATIC_MEDIA_BACKUP_FILE" -C "$PROJECT_DIR" static media

if [ $? -eq 0 ]; then
    echo "Static and Media files backup successfully created at $STATIC_MEDIA_BACKUP_FILE"
else
    echo "Static and Media files backup failed!" >&2
    exit 1
fi

# Delete backups older than 2 days
find "$BACKUP_DIR" -type f -mtime +2 -exec rm {} \;

# Transfer to DigitalOcean Spaces or other cloud storage (example with AWS CLI)
# Uncomment and configure the following lines if you are using DigitalOcean Spaces:
# SPACES_BUCKET="your-digitalocean-space-name"
# SPACES_REGION="your-region"
# aws s3 cp "$DB_BACKUP_FILE" s3://${SPACES_BUCKET}/ --region ${SPACES_REGION}
# aws s3 cp "$STATIC_MEDIA_BACKUP_FILE" s3://${SPACES_BUCKET}/ --region ${SPACES_REGION}

exit 0
