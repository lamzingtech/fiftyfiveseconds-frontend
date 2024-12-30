#!/bin/bash
sudo docker start 8c277d87242a
# sudo docker exec 8c277d87242a /bin/bash -c "cd /root/55-seconds && conda run -n openvoice ./start.sh"
sudo docker exec 8c277d87242a /bin/bash -c "cd /root/55-seconds && conda run -n openvoice uvicorn app:app --host 0.0.0.0 --port 8000"

# cd /root/55-seconds && ./script.sh