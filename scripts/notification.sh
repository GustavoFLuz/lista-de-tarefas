sudo apt-get install mailutils
echo "Installed mailutils"
echo "Sending email " | mail -s "a subject" ${EMAIL_LIST}