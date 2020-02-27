# Invoked when initializing localstack

set -x

# Create bucket

awslocal s3 mb s3://crossfeed-output-development

# Create queue

awslocal sqs create-queue --queue-name default

set +x
