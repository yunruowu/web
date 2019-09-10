#!/usr/bin/python
import psutil
import time
import requests
import json

def getinfo():
    mem = psutil.virtual_memory()
    memtotal = mem.total
    memfree = mem.free
    mempercent = mem.percent
    memused = mem.used
    cpu = psutil.cpu_percent(1)
    return memtotal,memfree,memused,mempercent,cpu

def post(url,sendData):
    headers = {
        "Content-type":"application/x-www-form-urlencoded",
    }
    requests.post(url, data = sendData, headers = headers)

def connect_http():
    while True:
        try:
            memtotal,memfree,memused,mempercent,cpu =getinfo()
            sendData = {
                'cpu': cpu, 
                'mempercent': mempercent
                }
            url = 'http://localhost:8082'
            post(url, sendData)
            print('post success')
            time.sleep(5)
        except Exception as e:
            print(e)


if __name__== "__main__":
    connect_http()

