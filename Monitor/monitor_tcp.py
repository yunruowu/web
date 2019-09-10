#!/usr/bin/python
import psutil
import time
import socket
import json

def getinfo():
    mem = psutil.virtual_memory()
    memtotal = mem.total
    memfree = mem.free
    mempercent = mem.percent
    memused = mem.used
    cpu = psutil.cpu_percent(1)
    return memtotal,memfree,memused,mempercent,cpu

def connect_tcp():
    tcpClientSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    severAddr = ('192.168.43.167', 8081)
    tcpClientSocket.connect(severAddr)
    print('connect success!')
    while True:
        try:
            memtotal,memfree,memused,mempercent,cpu =getinfo()
            print(cpu,mempercent)
            sendData = {
                'cpu': cpu, 
                'mempercent': mempercent
                }
            sendData_json = json.dumps(sendData)
            tcpClientSocket.send(sendData_json.encode('utf-8'))
            time.sleep(5)
        except Exception as e:
            print(e)
    tcpClientSocket.close()
    print('close socket')


if __name__== "__main__":
    connect_tcp()

