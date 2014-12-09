Kazoo-CallRecordingS3
=====================

Kazoo call recording with S3 storage

How to use it
-------------
1. You will need S3 API Key and Secret
2. Create 'my-recordings' bucket and then accountID folder inside this bucket. TODO: add auto-create folder if does not exist
3. Start your server.js for example on port 8888
4. Point kazoo recording URL to: http://your-domain.tld:8888/accountID/ 

> accountID can be anything, it can be your kazoo account ID or any other string representing your client's recordings.
