import json
import socket
import time
import pymysql
from flask import Flask, request

db = pymysql.connect(host = '127.0.0.1', port = 3306, user = 'root',
    passwd = '123456', db = 'shebang', charset = 'utf8')
cursor = db.cursor()
app = Flask(__name__)

def connect_db(cpu, mempercent):
    now = time.time()
    now_time = (int(now * 1000))
    sql_insert_cpu = "insert into state values('%s','%s','%s','%s')" %(now_time,2,'cpu',cpu)
    sql_insert_mempercent = "insert into state values('%s','%s','%s','%s')" %(now_time,2,'mempercent',mempercent)
    try:
        cursor.execute(sql_insert_cpu)
        db.commit()
        cursor.execute(sql_insert_mempercent)
        db.commit()
    except:
        db.rollback()

@app.route('/', methods = ['POST'])
def connect_http():
    cpu = request.form.get('cpu')
    mempercent = request.form.get('mempercent')
    connect_db(cpu, mempercent)
    print('received!')
    #db.close()
    return 'welcome'

if __name__ == "__main__":
    app.run(port = 8082,debug = True)


