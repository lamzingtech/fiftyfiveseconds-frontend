#!/bin/bash
sudo docker start 0287923e5f6c
sudo docker exec 0287923e5f6c /bin/bash -c "kill -9 \`lsof -t -i:8000\` && cd /root/55-seconds && uvicorn app:app --host 0.0.0.0 --port 8000"