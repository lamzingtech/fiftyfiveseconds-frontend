#!/bin/bash
sudo docker start 8c277d87242a
sudo docker exec 8c277d87242a /bin/bash -c "cd /root/55-seconds && conda run -n openvoice ./start.sh"

# cd /root/55-seconds && ./script.sh